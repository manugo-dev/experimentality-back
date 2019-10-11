import express from 'express';
import createError from 'http-errors';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import session from 'express-session';
import mongoose from 'mongoose';

import initMongoose from './services/database-service';
import initRoutes from './routes/index';

const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// run MongooseDatabase
initMongoose();

// v1 Router Endpoints
initRoutes(app);

app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
      ? process.env.SESSION_SECRET
      : 'exPsecr3t',
  }),
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('trust proxy', 1); // trust first proxy

app.use(helmet());

export default app;

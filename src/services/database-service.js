/* eslint-disable no-console */
import mongoose from 'mongoose';
import chalk from 'chalk';
import { mongoUrl } from '../config/config';

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

const initMongoose = () => {
  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      reconnectTries: 10,
      autoReconnect: true,
    })
    .catch(err => console.error(err));

  mongoose.connection.on('connected', () => {
    console.log(connected('Mongoose default connection is open.'));
  });

  mongoose.connection.on('error', err => {
    console.error(
      error(`Mongoose default connection has occured ${err} error`),
    );
  });

  mongoose.connection.on('disconnected', () => {
    console.log(disconnected('Mongoose default connection is disconnected'));
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        termination(
          'Mongoose default connection is disconnected due to application termination',
        ),
      );
      process.exit(0);
    });
  });
};

export default initMongoose;

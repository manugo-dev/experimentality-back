import routerV1 from './v1/index';

const initRoutes = app => {
  app.use('/api/v1', routerV1);
};

export default initRoutes;

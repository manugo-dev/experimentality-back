export const appName = 'api';
export const version = 'v1';
export const port = process.env.PORT || 3000;
export const dbMongo = process.env.MONGODB || 'mongodb://localhost:27017/experimentality';
export const prefixRoutes = `/${appName}/${version}`;

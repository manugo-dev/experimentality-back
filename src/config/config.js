export const port = process.env.PORT || 3000;
export const prefixRoutes = `/api`;
export const mongoUrl = process.env.MONGO_URL
  ? process.env.MONGO_URL
  : 'mongodb://localhost:27017/experimentality';

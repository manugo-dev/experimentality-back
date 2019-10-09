export const appName = 'api';
export const version = 'v1';
export const port = process.env.PORT || 3000;
export const mongoUrl = process.env.MONGO_URL || 'localhost';
export const mongoUser = process.env.MONGO_USER || 'admin';
export const mongoPass = process.env.MONGO_PASS || '';
export const mongoDatabase = process.env.MONGO_DATABASE || 'expback';
export const prefixRoutes = `/${appName}/${version}`;
export const firebaseConfig = {
  apiKey: 'AIzaSyDs3BISx4D5VwFfr5GYQFZf2PFg1TfRxGE',
  authDomain: 'experimentality-back.firebaseapp.com',
  databaseURL: 'https://experimentality-back.firebaseio.com',
  projectId: 'experimentality-back',
  storageBucket: 'experimentality-back.appspot.com',
  messagingSenderId: '444317262241',
  appId: '1:444317262241:web:8e0583dca7e500573eabe0',
  measurementId: 'G-K0051KFDZ4',
};

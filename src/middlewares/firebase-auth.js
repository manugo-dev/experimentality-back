import admin from '../services/firebase-service';

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization
      .split(' ')
      .slice(1, 2)
      .toString();
  } else {
    req.authToken = null;
  }
  next();
};

const checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    if (req) {
      const { authToken } = req;
      admin
        .auth()
        .verifyIdToken(authToken)
        .then(decodedToken => {
          const userInfo = decodedToken;
          req.authId = userInfo.uid;
          return next();
        })
        .catch(errorData => {
          return res.status(401).send({ error: `Not authorized` });
        });
    }
  });
};

export default checkIfAuthenticated;

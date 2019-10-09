import express from 'express';
import checkIfAuthenticated from '../middlewares/firebase-auth';

const router = express.Router();

/* Homepage. */
router.get('/:name?', (req, res) => {
  res.send(
    `Hi ${
      req.query.name ? req.query.name : 'friend'
    }, Welcome to Experimentality.`,
  );
});

/* Result Quote and Image Endpoint . */
router.get('/generate-changing-life-quote', (req, res) => {
  res.send(`An awesome quote will be here`);
});

router.delete('/quote/:id', checkIfAuthenticated, async (req, res) => {
  // Check if the token is empty
  return res.send('Working endpoint');
});

export default router;

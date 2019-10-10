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

// Remove quote endpoint
router.get('/allQuotes', (req, res) => {
  return res.send(`Sending all quotes`);
});

// Edit quote endpoint
router.put('/editQuote', (req, res) => {
  return res.send(req.body.id);
});

// Remove quote endpoint
router.delete('/removeQuote', checkIfAuthenticated, async (req, res) => {
  return res.send(`Quote to be removed: ${req.body.id}`);
});

export default router;

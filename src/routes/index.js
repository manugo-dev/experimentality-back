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
router.get('/allQuotes', async (req, res) => {
  return res.send(`El que quieres eliminar es el id ${req.body.id}`);
});

// Edit quote endpoint
router.put('/editQuote', async (req, res) => {
  return res.send(req.body.id);
});

// Remove quote endpoint
router.delete('/removeQuote', checkIfAuthenticated, async (req, res) => {
  return res.send(`El que quieres eliminar es el id ${req.body.id}`);
});

export default router;

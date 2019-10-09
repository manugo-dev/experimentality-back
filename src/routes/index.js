import express from 'express';

const router = express.Router();

/* Homepage. */
router.get('/:name?', (req, res) => {
  res.send(`Hi ${req.query.name ? req.query.name : 'friend'}, Welcome to Experimentality.`);
});

export default router;

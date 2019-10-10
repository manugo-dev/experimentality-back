import express from 'express';
import quotes from './quotes';
import generators from './generators';

const router = express.Router();
router.use(quotes);
router.use(generators);

export default router;

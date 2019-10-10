import express from 'express';
import checkIfAuthenticated from '../../middlewares/firebase-auth';
import quotesController from '../../controllers/v1/quotesController';

const router = express.Router();

// Get ALL quotes with pagination endpoint
router.get('/all:page?:per_page?', quotesController.getAll);

// Ged quote by ID endpoint
router.get('/quote/:id', quotesController.get);

// Remove quote endpoint
router.delete(
  '/remove-quote/:id',
  checkIfAuthenticated,
  quotesController.remove,
);

export default router;

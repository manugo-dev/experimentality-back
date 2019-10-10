import express from 'express';
import generatorController from '../../controllers/v1/generatorsController';

const router = express.Router();

// Send a famous quote and save on database
router.get('/generate-changing-life-quote', generatorController.get);

export default router;

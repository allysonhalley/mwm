import express from 'express';

import { getWines, getWine, createWine, updateWine, deleteWine } from '../controllers/wine.js';

const router = express.Router();

router.get('/wine', getWines);
router.post('/wine', createWine);
router.get('/wine/:id', getWine);
router.patch('/wine/:id', updateWine);
router.delete('/wine/:id', deleteWine);

export default router;
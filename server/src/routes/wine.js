import express from 'express';

import { getWines, getWine, createWine, updateWine, deleteWine } from '../controllers/wine.js';

const router = express.Router();

router.get('/', getWines);
router.Wine('/', createWine);
router.get('/:id', getWine);
router.patch('/:id', updateWine);
router.delete('/:id', deleteWine);

export default router;
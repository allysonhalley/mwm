import express from 'express';

import { getExperiences, getExperience, createExperience, updateExperience, deleteExperience } from '../controllers/experience.js';

const router = express.Router();

router.get('/', getExperiences);
router.post('/', createExperience);
router.get('/:id', getExperience);
router.patch('/:id', updateExperience);
router.delete('/:id', deleteExperience);

export default router;
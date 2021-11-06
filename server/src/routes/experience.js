import express from 'express';

import { getExperiences, getMyExperiences, getExperience, createExperience, updateExperience, deleteExperience } from '../controllers/experience.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', auth, getMyExperiences);
router.get('/all', getExperiences);
router.post('/add', auth, createExperience);
router.get('/:id', auth, getExperience);
router.patch('/:id', auth, updateExperience);
router.delete('/:id', auth, deleteExperience);

export default router;
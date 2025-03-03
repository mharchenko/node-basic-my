// src/router/students.js

import { Router } from 'express';

import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/student.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

// router.get('/students', getStudentsController);
// router.get('/students/:studentId', getStudentByIdController);
router.get('/students', ctrlWrapper(getStudentsController));

router.get('/students/:studentId', ctrlWrapper(getStudentByIdController));
router.post('/students', ctrlWrapper(createStudentController));
router.delete('/students/:studentId', ctrlWrapper(deleteStudentController));
router.put('/students/:studentId', ctrlWrapper(upsertStudentController));
router.patch('/students/:studentId', ctrlWrapper(patchStudentController));

export default router;

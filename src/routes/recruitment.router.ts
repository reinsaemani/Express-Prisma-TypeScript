import express from 'express';
import * as RecruitmentController from '../controllers/recruitment.controller';
import { protectAuth } from '../middleware/auth-middleware';
import { isAdmin, isPengawasOrInterviewer } from '../middleware/role-middleware';

const router = express.Router();

router.get('/', protectAuth, isAdmin, RecruitmentController.listApplicantsByStage);
router.patch('/:id', protectAuth, isPengawasOrInterviewer, RecruitmentController.moveApplicantToStage);

export default router;

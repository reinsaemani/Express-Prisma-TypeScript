import express from 'express';
import * as ApplicantsController from '../controllers/applicants.controller';
import { protectAuth } from '../middleware/auth-middleware';
import { isAdmin } from '../middleware/role-middleware';

const router = express.Router();

router.post('/', protectAuth, isAdmin, ApplicantsController.createApplicant);
router.get('/:id', protectAuth, isAdmin, ApplicantsController.getApplicant);
router.get('/', protectAuth, isAdmin, ApplicantsController.listApplicants);
router.put('/:id', protectAuth, isAdmin, ApplicantsController.updateApplicant);
router.delete('/:id', protectAuth, isAdmin, ApplicantsController.deleteApplicant);
// router.post('/',ApplicantsController.createApplicant);
// router.get('/:id',ApplicantsController.getApplicant);
// router.get('/',ApplicantsController.listApplicants);
// router.put('/:id',ApplicantsController.updateApplicant);
// router.delete('/:id',ApplicantsController.deleteApplicant);

export default router;

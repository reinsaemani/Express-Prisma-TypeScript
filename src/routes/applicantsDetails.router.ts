import express from 'express';
import * as ApplicantsDetailsController from '../controllers/applicantsDetails.controller';
import { protectAuth } from '../middleware/auth-middleware';
import { isAdmin } from '../middleware/role-middleware';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.post('/', upload.single('penilaian_file'), ApplicantsDetailsController.createApplicantsDetail);
router.get('/:id', protectAuth, isAdmin, ApplicantsDetailsController.getApplicantsDetail);
router.get(
  '/applicant/:applicants_id',
  protectAuth,
  isAdmin,
  ApplicantsDetailsController.listApplicantsDetailsByApplicant
);
router.put(
  '/:id',
  protectAuth,
  // isAdmin,
  // isPengawasOrInterviewer,
  upload.single('penilaian_file'),
  ApplicantsDetailsController.updateApplicantsDetail
);
router.delete('/:id', protectAuth, isAdmin, ApplicantsDetailsController.deleteApplicantsDetail);

// router.get('/', ApplicantsDetailsController.listAllApplicantsDetails);
// router.post('/', ApplicantsDetailsController.createApplicantsDetail);
// router.get('/:id',ApplicantsDetailsController.getApplicantsDetail);
// router.get('/applicant/:applicants_id',ApplicantsDetailsController.listApplicantsDetailsByApplicant);
// router.put('/:id',isPengawasOrInterviewer, ApplicantsDetailsController.updateApplicantsDetail);
// router.delete('/:id',ApplicantsDetailsController.deleteApplicantsDetail);

export default router;

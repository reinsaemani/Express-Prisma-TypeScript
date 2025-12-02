import express from 'express';
import * as ApplicantsDetailsController from '../controllers/applicantsDetails.controller';
import { protectAuth } from '../middleware/auth-middleware';
import { isAdmin } from '../middleware/role-middleware';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.post(
  '/',
  protectAuth,
  isAdmin,
  upload.single('penilaian_file'),
  ApplicantsDetailsController.createApplicantsDetail
);

// 🔥 sekarang mendukung ?applicants_id=1
router.get('/', protectAuth, isAdmin, ApplicantsDetailsController.listApplicantsDetails);

router.get('/:id', protectAuth, isAdmin, ApplicantsDetailsController.getApplicantsDetail);
router.put(
  '/:id',
  protectAuth,
  isAdmin,
  upload.single('penilaian_file'),
  ApplicantsDetailsController.updateApplicantsDetail
);
router.delete('/:id', protectAuth, isAdmin, ApplicantsDetailsController.deleteApplicantsDetail);
// router.get('/', ApplicantsDetailsController.listAllApplicantsDetails);
// router.post('/', ApplicantsDetailsController.createApplicantsDetail);
// router.get('/:id',ApplicantsDetailsController.getApplicantsDetail);
// router.put('/:id',isPengawasOrInterviewer, ApplicantsDetailsController.updateApplicantsDetail);
// router.delete('/:id',ApplicantsDetailsController.deleteApplicantsDetail);

export default router;

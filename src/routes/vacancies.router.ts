import express from 'express';
import * as VacanciesController from '../controllers/vacancies.controller';
import { protectAuth } from '../middleware/auth-middleware';
import { isAdmin } from '../middleware/role-middleware';

const router = express.Router();

// Access : Public
// GET : Get List of all vacancies
router.get('/', protectAuth, isAdmin, VacanciesController.listVacancies);

// Access : Public
// GET : Get One Vacancies by ID
// Params : id
router.get('/:id', protectAuth, isAdmin, VacanciesController.checkExistingVacancies, VacanciesController.getVacancies);

// Access : Private
// POST : Create one Vacancies
// Body : sesuai TVacanciesWrite
router.post('/', protectAuth, isAdmin, VacanciesController.validateVacanciesData, VacanciesController.createVacancies);

// Access : Private
// PUT : update a Vacancies
// Params : id
// Body : sesuai TVacanciesWrite
router.put(
  '/:id',
  isAdmin,
  protectAuth,
  VacanciesController.validateVacanciesData,
  VacanciesController.checkExistingVacancies,
  VacanciesController.updateVacancies
);

router.patch(
  '/:id/status',
  protectAuth,
  isAdmin,
  VacanciesController.checkExistingVacancies,
  VacanciesController.updateVacancyStatus
);

// Access : Private
// DELETE : delete a Vacancies
// Params : id
router.delete(
  '/:id',
  isAdmin,
  protectAuth,
  VacanciesController.checkExistingVacancies,
  VacanciesController.deleteVacancies
);

export default router;

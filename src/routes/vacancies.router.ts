import express from 'express';
import * as VacanciesController from '../controllers/vacancies.controller';
// import { protectAuth } from '../middleware/auth-middleware';

const router = express.Router();

// Access : Public
// GET : Get List of all vacancies
router.get('/', VacanciesController.listVacancies);

// Access : Public
// GET : Get One Vacancies by ID
// Params : id
router.get('/:id', VacanciesController.checkExistingVacancies, VacanciesController.getVacancies);

// Access : Private
// POST : Create one Vacancies
// Body : sesuai TVacanciesWrite
router.post(
  '/',
  // protectAuth,
  VacanciesController.validateVacanciesData,
  VacanciesController.createVacancies
);

// Access : Private
// PUT : update a Vacancies
// Params : id
// Body : sesuai TVacanciesWrite
router.put(
  '/:id',
  // protectAuth,
  VacanciesController.validateVacanciesData,
  VacanciesController.checkExistingVacancies,
  VacanciesController.updateVacancies
);

router.patch(
  '/:id/status',
  VacanciesController.checkExistingVacancies,
  VacanciesController.updateVacancyStatus
);

// Access : Private
// DELETE : delete a Vacancies
// Params : id
router.delete(
  '/:id',
  // protectAuth,
  VacanciesController.checkExistingVacancies,
  VacanciesController.deleteVacancies
);

export default router;

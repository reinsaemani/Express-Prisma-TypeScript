import { Request, Response, NextFunction } from 'express';
import * as ApplicantsService from '../services/applicants.service';
import { applicantsSchema, applicantsUpdateSchema } from '../types/zod';
import { sendSuccessResponse, sendBadRequestResponse } from '../utils/responseHandler';

// Create
export const createApplicant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = applicantsSchema.parse(req.body);

    const normalized = {
      ...parsed,
      current_stage: parsed.current_stage ?? 'HR_INT', // default Prisma
    };

    const created = await ApplicantsService.createApplicant(normalized);
    return sendSuccessResponse(res, created, 'Applicant created successfully');
  } catch (error) {
    next(error);
  }
};

// Get
export const getApplicant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const applicant = await ApplicantsService.getApplicantByID(id);
    if (!applicant) return sendBadRequestResponse(res, 'Applicant not found');
    return sendSuccessResponse(res, applicant);
  } catch (error) {
    next(error);
  }
};

// List
export const listApplicants = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const applicants = await ApplicantsService.listApplicants();
    return sendSuccessResponse(res, applicants);
  } catch (error) {
    next(error);
  }
};

// Update
export const updateApplicant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const parsed = applicantsUpdateSchema.parse(req.body);
    const updated = await ApplicantsService.updateApplicantByID(id, parsed);
    return sendSuccessResponse(res, updated, 'Applicant updated successfully');
  } catch (error) {
    next(error);
  }
};

// Delete
export const deleteApplicant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const deleted = await ApplicantsService.deleteApplicantByID(id);
    return sendSuccessResponse(res, deleted, 'Applicant deleted successfully');
  } catch (error) {
    next(error);
  }
};

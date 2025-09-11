import { Request, Response, NextFunction } from 'express';
import * as ApplicantsDetailsService from '../services/applicantsDetails.service';
import { applicantsDetailsSchema, applicantsDetailsUpdateSchema } from '../types/zod';
import { sendSuccessResponse, sendBadRequestResponse } from '../utils/responseHandler';

//List
export const listAllApplicantsDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const details = await ApplicantsDetailsService.listAllApplicantsDetails();
    return sendSuccessResponse(res, details);
  } catch (error) {
    next(error);
  }
};

// Create
export const createApplicantsDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = applicantsDetailsSchema.parse(req.body);

    const normalized = {
      ...parsed,
      status: parsed.status ?? 'PENDING',
      notes: parsed.notes ?? null,
      penilaian: parsed.penilaian ?? null,
      schedule_at: parsed.schedule_at ?? null,
    };

    const created = await ApplicantsDetailsService.createApplicantsDetail(normalized);
    return sendSuccessResponse(res, created, 'Applicants detail created successfully');
  } catch (error) {
    next(error);
  }
};


// Get by ID
export const getApplicantsDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const detail = await ApplicantsDetailsService.getApplicantsDetailByID(id);
    if (!detail) return sendBadRequestResponse(res, 'Applicants detail not found');
    return sendSuccessResponse(res, detail);
  } catch (error) {
    next(error);
  }
};

// List by applicant
export const listApplicantsDetailsByApplicant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const applicants_id = Number(req.params.applicants_id);
    const details = await ApplicantsDetailsService.listApplicantsDetailsByApplicant(applicants_id);
    return sendSuccessResponse(res, details);
  } catch (error) {
    next(error);
  }
};

// Update (Pengawas & Interviewer bisa update notes & penilaian)
export const updateApplicantsDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const parsed = applicantsDetailsUpdateSchema.parse(req.body);
    const normalized = { ...parsed, notes: parsed.notes ?? null, penilaian: parsed.penilaian ?? null, schedule_at: parsed.schedule_at ?? null };
    const updated = await ApplicantsDetailsService.updateApplicantsDetailByID(id, normalized);
    return sendSuccessResponse(res, updated, 'Applicants detail updated successfully');
  } catch (error) {
    next(error);
  }
};

// Delete
export const deleteApplicantsDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const deleted = await ApplicantsDetailsService.deleteApplicantsDetailByID(id);
    return sendSuccessResponse(res, deleted, 'Applicants detail deleted successfully');
  } catch (error) {
    next(error);
  }
};

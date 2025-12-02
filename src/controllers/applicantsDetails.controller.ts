import { Request, Response, NextFunction } from 'express';
import * as ApplicantsDetailsService from '../services/applicantsDetails.service';
import { applicantsDetailsSchema, applicantsDetailsUpdateSchema } from '../types/zod';
import { sendSuccessResponse, sendBadRequestResponse } from '../utils/responseHandler';

// List all
export const listApplicantsDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const applicants_id = req.query.applicants_id ? Number(req.query.applicants_id) : undefined;
    const details = await ApplicantsDetailsService.listApplicantsDetails(applicants_id);
    return sendSuccessResponse(res, details);
  } catch (error) {
    next(error);
  }
};

export const createApplicantsDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = applicantsDetailsSchema.parse(req.body);

    const normalized = {
      ...parsed,
      notes: parsed.notes ?? null,
      penilaian_file_path: parsed.penilaian_file_path ?? null,
      schedule_at: parsed.schedule_at ?? null,
      status: parsed.status ?? null,
    };

    const created = await ApplicantsDetailsService.createApplicantsDetail(normalized);
    return sendSuccessResponse(res, created, 'Applicants detail created successfully');
  } catch (error) {
    next(error);
  }
};

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

export const updateApplicantsDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const parsed = applicantsDetailsUpdateSchema.parse(req.body);

    const filePath = req.file ? `/uploads/penilaian/${req.file.filename}` : parsed.penilaian_file_path ?? null;

    const normalized = {
      ...parsed,
      notes: parsed.notes ?? null,
      penilaian_file_path: filePath,
      schedule_at: parsed.schedule_at ?? null,
    };

    const updated = await ApplicantsDetailsService.updateApplicantsDetailByID(id, normalized);
    return sendSuccessResponse(res, updated, 'Applicants detail updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteApplicantsDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const deleted = await ApplicantsDetailsService.deleteApplicantsDetailByID(id);
    return sendSuccessResponse(res, deleted, 'Applicants detail deleted successfully');
  } catch (error) {
    next(error);
  }
};

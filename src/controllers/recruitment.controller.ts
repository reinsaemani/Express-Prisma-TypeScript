import { Request, Response, NextFunction } from 'express';
import * as RecruitmentService from '../services/recruitment.service';
import { sendSuccessResponse, sendBadRequestResponse } from '../utils/responseHandler';

export const listApplicantsByStage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stage = (req.query.stage as string) || null;
    const applicants = await RecruitmentService.listApplicantsByStage(stage as any);
    return sendSuccessResponse(res, applicants);
  } catch (error) {
    next(error);
  }
};

export const moveApplicantToStage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const { newStage, schedule_at, notes } = req.body;

    if (!newStage) return sendBadRequestResponse(res, 'newStage is required');

    const updated = await RecruitmentService.moveApplicantToStage(
      id,
      newStage,
      schedule_at ? new Date(schedule_at) : null,
      notes ?? null
    );
    return sendSuccessResponse(res, updated, 'Applicant moved to new stage');
  } catch (error) {
    next(error);
  }
};

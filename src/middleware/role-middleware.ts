import { Request, Response, NextFunction } from 'express';
import { sendBadRequestResponse } from '../utils/responseHandler';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'ADMIN') return sendBadRequestResponse(res, 'Access denied - Admin only');
  next();
};

export const isPengawasOrInterviewer = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !['PENGAWAS', 'INTERVIEWER'].includes(req.user.role)) {
    return sendBadRequestResponse(res, 'Access denied - Pengawas/Interviewer only');
  }
  next();
};

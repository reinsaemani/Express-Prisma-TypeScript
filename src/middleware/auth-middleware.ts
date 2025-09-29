import * as AccountService from '../services/account.service'; // buat service baru
import { NextFunction, Request, Response } from 'express';
import { sendBadRequestResponse } from '../utils/responseHandler';
import { verifyToken } from '../utils/jwtHandler';

const protectAuth = async (request: Request, response: Response, next: NextFunction) => {
  const token = request.cookies?.jwt;

  if (!token) {
    return sendBadRequestResponse(response, 'Unauthorized - you need to login');
  }

  try {
    const decoded = verifyToken(token);
    const authUser = await AccountService.getAccountByID(decoded.id);

    if (authUser) {
      request.user = authUser;
      return next();
    }

    return sendBadRequestResponse(response, 'Unauthorized - user not found');
  } catch (error: any) {
    return next(error);
  }
};

export { protectAuth };

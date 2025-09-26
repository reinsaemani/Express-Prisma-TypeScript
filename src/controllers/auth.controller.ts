import * as AccountService from '../services/account.service';
import { NextFunction, Request, Response } from 'express';
import { accountSchema, TAccountSchema } from '../types/zod';
import { sendSuccessNoDataResponse, sendSuccessResponse, sendUnauthorizedResponse } from '../utils/responseHandler';
import { comparePasswords } from '../utils/bcryptHandler';
import { generateToken } from '../utils/jwtHandler';

// ------------------ LOGIN ------------------
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRequest: TAccountSchema = req.body;
    const user = await AccountService.getAccountByUsername(userRequest.username);

    if (!user) {
      return sendUnauthorizedResponse(res, 'Credentials Error');
    }

    const passwordCompare = await comparePasswords(userRequest.password, user.password_hash);

    if (!passwordCompare) {
      return sendUnauthorizedResponse(res, 'Credentials Error');
    }

    const token = generateToken({ id: user.account_id }, '30d');

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.APP_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 hari
    });

    const responseData = {
      account_id: user.account_id,
      username: user.username,
      role: user.role,
    };

    return sendSuccessResponse(res, responseData, 'Login successful');
  } catch (error) {
    next(error);
  }
};

// ------------------ LOGOUT ------------------
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    return sendSuccessNoDataResponse(res, 'Logout successful');
  } catch (error) {
    next(error);
  }
};

// ------------------ VALIDATION ------------------
export const validateLoginData = (req: Request, res: Response, next: NextFunction) => {
  try {
    accountSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

import { Request, Response, NextFunction } from 'express';
import * as AccountService from '../services/account.service';
import { accountSchema, resetPasswordSchema, updateRoleSchema } from '../types/zod';
import { hashPassword } from '../utils/bcryptHandler';
import { sendSuccessResponse, sendBadRequestResponse} from '../utils/responseHandler';
import { account_role } from '@prisma/client';


// ✅ Create account (Admin only)
export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = accountSchema.parse(req.body);
    const hashed = await hashPassword(parsed.password);

    // ✅ fallback pakai enum
    const role: account_role = parsed.role ?? account_role.INTERVIEWER;

    const account = await AccountService.createAccount(parsed.username, hashed, role);
    return sendSuccessResponse(res, account, 'Account created successfully');
  } catch (error) {
    next(error);
  }
};

// ✅ Get account by ID
export const getAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const account = await AccountService.getAccountByID(id);
    if (!account) return sendBadRequestResponse(res, 'Account not found');
    return sendSuccessResponse(res, account);
  } catch (error) {
    next(error);
  }
};

// ✅ List accounts
export const listAccounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accounts = await AccountService.listAccounts();
    return sendSuccessResponse(res, accounts);
  } catch (error) {
    next(error);
  }
};

// ✅ Update role
export const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const { role } = updateRoleSchema.parse(req.body);

    const updated = await AccountService.updateRoleByID(id, role as account_role);
    return sendSuccessResponse(res, updated, 'Role updated successfully');
  } catch (error) {
    next(error);
  }
};

// ✅ Reset password (Admin only)
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const { newPassword } = resetPasswordSchema.parse(req.body);
    const hashed = await hashPassword(newPassword);
    const updated = await AccountService.updatePasswordByID(id, hashed);
    return sendSuccessResponse(res, updated, 'Password reset successfully');
  } catch (error) {
    next(error);
  }
};



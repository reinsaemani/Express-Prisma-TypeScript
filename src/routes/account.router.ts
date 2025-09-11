import express from 'express';
import * as AccountController from '../controllers/account.controller';
import { protectAuth } from '../middleware/auth-middleware';
import { isAdmin } from '../middleware/role-middleware';

const router = express.Router();

// Akses: Admin only
router.post('/', protectAuth, isAdmin, AccountController.createAccount);
router.get('/', protectAuth, isAdmin, AccountController.listAccounts);
router.get('/:id', protectAuth, isAdmin, AccountController.getAccount);
router.put('/:id/role', protectAuth, isAdmin, AccountController.updateRole);
router.put('/:id/reset-password', protectAuth, isAdmin, AccountController.resetPassword);

export default router;

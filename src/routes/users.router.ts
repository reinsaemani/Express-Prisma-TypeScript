import express from 'express';
import * as UserController from '../controllers/users.controller';
import { protectAuth } from '../middleware/auth-middleware';
import { isAdmin } from '../middleware/role-middleware';

const router = express.Router();

router.get('/', protectAuth, isAdmin, UserController.listUsers);
router.get('/:id', protectAuth, isAdmin, UserController.getUser);
router.post('/', protectAuth, isAdmin, UserController.createUser);
router.put('/:id', protectAuth, isAdmin, UserController.updateUser);
router.delete('/:id', protectAuth, isAdmin, UserController.deleteUser);

export default router;

import { Request, Response } from 'express';
import * as UserService from '../services/users.service';

// GET /api/users
export const listUsers = async (_req: Request, res: Response) => {
  const users = await UserService.listUsers();
  res.json(users);
};

// GET /api/users/:id
export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await UserService.getUserByID(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// POST /api/users
export const createUser = async (req: Request, res: Response) => {
  const user = await UserService.createUser(req.body);
  res.status(201).json(user);
};

// PUT /api/users/:id
export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await UserService.updateUser(id, req.body);
  res.json(user);
};

// DELETE /api/users/:id
export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await UserService.deleteUser(id);
  res.status(204).send();
};

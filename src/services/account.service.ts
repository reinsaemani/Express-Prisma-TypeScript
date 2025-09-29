import { db } from '../utils/db.server';
import { TAccountRead } from '../types/general';
import { account, account_role } from '@prisma/client';

// Get account by username (untuk login)
export const getAccountByUsername = async (
  username: string
): Promise<account | null> => {
  return db.account.findUnique({
    where: { username },
  });
};

export const getAccountByID = async (id: number): Promise<account | null> => {
  return db.account.findUnique({
    where: { account_id: id },
  });
};

export const listAccounts = async (): Promise<TAccountRead[]> => {
  return db.account.findMany({
    select: {
      account_id: true,
      username: true,
      role: true,
      created_at: true,
      updated_at: true,
    },
  });
};

export const updateRoleByID = async (id: number, role: account_role): Promise<TAccountRead> => {
  return db.account.update({
    where: { account_id: id },
    data: { role },
    select: {
      account_id: true,
      username: true,
      role: true,
      created_at: true,
      updated_at: true,
    },
  });
};

export const updatePasswordByID = async (id: number, hashedPassword: string): Promise<TAccountRead> => {
  return db.account.update({
    where: { account_id: id },
    data: { password_hash: hashedPassword },
    select: {
      account_id: true,
      username: true,
      role: true,
      created_at: true,
      updated_at: true,
    },
  });
};

export const createAccount = async (
  username: string,
  hashedPassword: string,
  role: account_role
): Promise<TAccountRead> => {
  return db.account.create({
    data: { username, password_hash: hashedPassword, role },
    select: {
      account_id: true,
      username: true,
      role: true,
      created_at: true,
      updated_at: true,
    },
  });
};

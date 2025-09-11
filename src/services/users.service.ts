import { db } from '../utils/db.server';
import { TUserID, TUserRead, TUserWrite } from '../types/general';

// list all users
export const listUsers = async (): Promise<TUserRead[]> => {
  return db.users.findMany({
    include: {
      documents: true,
    },
  });
};

// get one user
export const getUserByID = async (id: TUserID): Promise<TUserRead | null> => {
  return db.users.findUnique({
    where: { user_id: id },
    include: { documents: true },
  });
};

// create new user
export const createUser = async (user: TUserWrite): Promise<TUserRead> => {
  return db.users.create({
    data: user,
    include: { documents: true },
  });
};

// update user
export const updateUser = async (
  id: TUserID,
  user: TUserWrite
): Promise<TUserRead> => {
  return db.users.update({
    where: { user_id: id },
    data: user,
    include: { documents: true },
  });
};

// delete user
export const deleteUser = async (id: TUserID): Promise<void> => {
  await db.users.delete({
    where: { user_id: id },
  });
};

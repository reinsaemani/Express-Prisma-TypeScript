import { db } from '../utils/db.server';
import { TApplicantsWrite, TApplicantsRead } from '../types/general';

export const createApplicant = async (data: TApplicantsWrite): Promise<TApplicantsRead> => {
  return db.applicants.create({
    data,
    include: {
      user: true,
      vacancy: true,
      details: { include: { vacancy: true } },
    },
  });
};

export const getApplicantByID = async (id: number): Promise<TApplicantsRead | null> => {
  return db.applicants.findUnique({
    where: { applicants_id: id },
    include: { user: true, vacancy: true, details: true },
  });
};

export const listApplicants = async (): Promise<TApplicantsRead[]> => {
  return db.applicants.findMany({
    orderBy: { created_at: 'desc' },
    include: { user: true, vacancy: true, details: true },
  });
};

export const updateApplicantByID = async (id: number, data: Partial<TApplicantsWrite>): Promise<TApplicantsRead> => {
  return db.applicants.update({
    where: { applicants_id: id },
    data,
    include: { user: true, vacancy: true, details: true },
  });
};

export const deleteApplicantByID = async (id: number): Promise<TApplicantsRead> => {
  return db.applicants.delete({
    where: { applicants_id: id },
    include: { user: true, vacancy: true, details: true },
  });
};

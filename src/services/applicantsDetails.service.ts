import { db } from '../utils/db.server';
import { TApplicantsDetailsWrite, TApplicantsDetailsRead } from '../types/general';

export const listAllApplicantsDetails = async (): Promise<TApplicantsDetailsRead[]> => {
  return db.applicants_details.findMany();
};

export const createApplicantsDetail = async (data: TApplicantsDetailsWrite): Promise<TApplicantsDetailsRead> => {
  return db.applicants_details.create({ data });
};

export const getApplicantsDetailByID = async (id: number): Promise<TApplicantsDetailsRead | null> => {
  return db.applicants_details.findUnique({ where: { detail_applicants_id: id } });
};

export const listApplicantsDetailsByApplicant = async (applicants_id: number): Promise<TApplicantsDetailsRead[]> => {
  return db.applicants_details.findMany({ where: { applicants_id } });
};

export const updateApplicantsDetailByID = async (id: number, data: Partial<TApplicantsDetailsWrite>): Promise<TApplicantsDetailsRead> => {
  return db.applicants_details.update({ where: { detail_applicants_id: id }, data });
};

export const deleteApplicantsDetailByID = async (id: number): Promise<TApplicantsDetailsRead> => {
  return db.applicants_details.delete({ where: { detail_applicants_id: id } });
};

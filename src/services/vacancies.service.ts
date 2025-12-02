import { db } from '../utils/db.server';
import { TVacanciesID, TVacanciesRead, TVacanciesWrite } from '../types/general';

// List semua vacancies
export const listVacancies = async (): Promise<TVacanciesRead[]> => {
  return db.vacancies.findMany({
    select: {
      vacancies_id: true,
      title: true,
      // location: true,
      type: true,
      degree: true,
      level: true,
      qualification: true,
      responsibilities: true,
      documents: true,
      benefit: true,
      deadline: true,
      is_open: true,
    },
    orderBy: {
      deadline: 'asc',
    },
  });
};

// Get Vacancies by ID
export const getVacancies = async (id: TVacanciesID): Promise<TVacanciesRead | null> => {
  return db.vacancies.findUnique({
    where: {
      vacancies_id: id,
    },
    select: {
      vacancies_id: true,
      title: true,
      // location: true,
      type: true,
      degree: true,
      level: true,
      qualification: true,
      responsibilities: true,
      documents: true,
      benefit: true,
      deadline: true,
      is_open: true,
    },
  });
};

// Create new Vacancies
export const createVacancies = async (vacancies: TVacanciesWrite): Promise<TVacanciesRead> => {
  return db.vacancies.create({
    data: {
      ...vacancies,
      deadline: vacancies.deadline ? new Date(vacancies.deadline) : null,
    },
    select: {
      vacancies_id: true,
      title: true,
      // location: true,
      type: true,
      degree: true,
      level: true,
      qualification: true,
      responsibilities: true,
      documents: true,
      benefit: true,
      deadline: true,
      is_open: true,
    },
  });
};

// Update Vacancies
export const updateVacancies = async (
  Vacancies: Partial<TVacanciesWrite>,
  id: TVacanciesID
): Promise<TVacanciesRead> => {
  return db.vacancies.update({
    where: { vacancies_id: id },
    data: {
      ...Vacancies,
      deadline: Vacancies.deadline ? new Date(Vacancies.deadline) : null,
    },
    select: {
      vacancies_id: true,
      title: true,
      // location: true,
      type: true,
      degree: true,
      level: true,
      qualification: true,
      responsibilities: true,
      documents: true,
      benefit: true,
      deadline: true,
      is_open: true,
    },
  });
};

export const updateVacancyStatus = async (id: TVacanciesID, isOpen: boolean): Promise<TVacanciesRead> => {
  return db.vacancies.update({
    where: {
      vacancies_id: id,
    },
    data: {
      is_open: isOpen,
    },
    select: {
      vacancies_id: true,
      title: true,
      // location: true,
      type: true,
      degree: true,
      level: true,
      qualification: true,
      responsibilities: true,
      documents: true,
      benefit: true,
      deadline: true,
      is_open: true,
    },
  });
};

export const deleteVacancies = async (id: TVacanciesID): Promise<void> => {
  await db.vacancies.delete({
    where: {
      vacancies_id: id,
    },
  });
};

export const closeExpiredVacancies = async (): Promise<number> => {
  const result = await db.vacancies.updateMany({
    where: {
      deadline: { lt: new Date() },
      is_open: true,
    },
    data: {
      is_open: false,
    },
  });
  return result.count;
};

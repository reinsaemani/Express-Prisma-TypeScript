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
  Vacancies: Partial<TVacanciesWrite>, // 🔥 ubah jadi Partial
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

// services/vacancies.service.ts

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

// Delete Vacancies
export const deleteVacancies = async (id: TVacanciesID): Promise<void> => {
  await db.vacancies.delete({
    where: {
      vacancies_id: id,
    },
  });
};

import { HttpStatusCode } from '../utils/HttpStatusCode';
import * as VacanciesService from '../services/vacancies.service';
import { NextFunction, Request, Response } from 'express';
import { vacanciesSchema } from '../types/zod';
import { TVacanciesWrite } from '../types/general';
import { sendNotFoundResponse, sendSuccessNoDataResponse, sendSuccessResponse } from '../utils/responseHandler';

export const listVacancies = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const vacanciess = await VacanciesService.listVacancies();
    return sendSuccessResponse(response, vacanciess);
  } catch (error: any) {
    next(error);
  }
};

export const getVacancies = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id, 10);
    const vacancies = await VacanciesService.getVacancies(id);
    return sendSuccessResponse(response, vacancies);
  } catch (error: any) {
    next(error);
  }
};

export const createVacancies = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const vacancies: TVacanciesWrite = request.body;
    const newVacancies = await VacanciesService.createVacancies(vacancies);
    return sendSuccessResponse(response, newVacancies, 'Vacancy created successfully', HttpStatusCode.CREATED);
  } catch (error: any) {
    console.error('CreateVacancies error:', error);
    next(error);
  }
};

export const updateVacancies = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id, 10);
    const vacancies: TVacanciesWrite = request.body;
    const updatedVacancies = await VacanciesService.updateVacancies(vacancies, id);
    return sendSuccessResponse(response, updatedVacancies);
  } catch (error: any) {
    next(error);
  }
};

export const deleteVacancies = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id, 10);
    await VacanciesService.deleteVacancies(id);
    return sendSuccessNoDataResponse(response, 'Vacancies has been deleted');
  } catch (error: any) {
    next(error);
  }
};

export const checkExistingVacancies = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id, 10);
    const vacancies = await VacanciesService.getVacancies(id);
    if (!vacancies) {
      return sendNotFoundResponse(response, 'Vacancies Not Found');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const validateVacanciesData = (request: Request, response: Response, next: NextFunction) => {
  try {
    const vacancies = request.body;
    vacanciesSchema.parse(vacancies);
    next();
  } catch (error) {
    console.error('Validation error:', error);
    next(error);
  }
};

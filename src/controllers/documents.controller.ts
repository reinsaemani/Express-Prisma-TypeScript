import { Request, Response, NextFunction } from "express";
import * as DocumentService from "../services/documents.service";
import { sendBadRequestResponse, sendSuccessResponse } from "../utils/responseHandler";
import path from "path";
import fs from "fs";

export const uploadDocuments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id, NIK } = req.body;
    if (!user_id || !NIK) return sendBadRequestResponse(res, "user_id and NIK required");

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const saved = await DocumentService.createOrUpdateDocuments(user_id, files);
    return sendSuccessResponse(res, saved, "Documents uploaded successfully");
  } catch (err) {
    next(err);
  }
};

export const listDocuments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id = Number(req.params.user_id);
    const docs = await DocumentService.getDocumentsByUser(user_id);
    if (!docs) return sendBadRequestResponse(res, "No documents found");
    return sendSuccessResponse(res, docs);
  } catch (err) {
    next(err);
  }
};

export const previewDocument = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { NIK, filename } = req.params;
    const filePath = path.join(__dirname, "../../storage/uploads/applicants", NIK, filename);
    if (!fs.existsSync(filePath)) return sendBadRequestResponse(res, "File not found");
    return res.sendFile(filePath);
  } catch (err) {
    next(err);
  }
};

export const downloadDocument = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { NIK, filename } = req.params;
    const filePath = path.join(__dirname, "../../storage/uploads/applicants", NIK, filename);
    if (!fs.existsSync(filePath)) return sendBadRequestResponse(res, "File not found");
    return res.download(filePath);
  } catch (err) {
    next(err);
  }
};

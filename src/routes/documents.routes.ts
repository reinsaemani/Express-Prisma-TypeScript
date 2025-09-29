import express from "express";
import { protectAuth } from "../middleware/auth-middleware";
import { isAdmin } from "../middleware/role-middleware";
import * as DocumentsController from "../controllers/documents.controller";
import { uploadDocuments } from "../middleware/upload-middleware";

const router = express.Router();

// Pelamar upload dokumen
router.post("/upload", uploadDocuments, DocumentsController.uploadDocuments);

// Admin lihat dokumen
router.get("/:user_id", protectAuth, isAdmin, DocumentsController.listDocuments);
router.get("/:NIK/:filename/preview", protectAuth, isAdmin, DocumentsController.previewDocument);
router.get("/:NIK/:filename/download", protectAuth, isAdmin, DocumentsController.downloadDocument);

export default router;

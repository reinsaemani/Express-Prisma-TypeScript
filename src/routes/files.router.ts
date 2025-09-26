import express from 'express';
import fs from 'fs';
import path from 'path';
import { protectAuth } from '../middleware/auth-middleware';
import { isAdmin } from '../middleware/role-middleware';
import { sendErrorResponse } from '../utils/responseHandler';

const router = express.Router();
const UPLOAD_DIR = path.join(process.cwd(), 'storage', 'pelamar');

function safeJoin(base: string, target: string) {
  const targetPath = path.join(base, target);
  if (!targetPath.startsWith(base)) {
    throw new Error('Invalid path');
  }
  return targetPath;
}

function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.pdf':
      return 'application/pdf';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    default:
      return 'application/octet-stream';
  }
}

// 📄 Preview
router.get('/:filename/preview', protectAuth, isAdmin, (req, res) => {
  try {
    const filePath = safeJoin(UPLOAD_DIR, req.params.filename);
    if (!fs.existsSync(filePath)) {
      return sendErrorResponse(res, 'File not found', 404);
    }

    const mimeType = getMimeType(req.params.filename);
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `inline; filename="${req.params.filename}"`);

    fs.createReadStream(filePath).pipe(res);
  } catch {
    return sendErrorResponse(res, 'Invalid file request', 400);
  }
});

// 📥 Download
router.get('/:filename/download', protectAuth, isAdmin, (req, res) => {
  try {
    const filePath = safeJoin(UPLOAD_DIR, req.params.filename);
    if (!fs.existsSync(filePath)) {
      return sendErrorResponse(res, 'File not found', 404);
    }
    res.download(filePath, req.params.filename);
  } catch {
    return sendErrorResponse(res, 'Invalid file request', 400);
  }
});

export default router;

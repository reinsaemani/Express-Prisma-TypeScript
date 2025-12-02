import express from 'express';
import multer from 'multer';
import * as BannerController from '../controllers/banner.controller';
import { protectAuth } from '../middleware/auth-middleware';
import { isAdmin } from '../middleware/role-middleware';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// ✅ Gunakan path dari root, bukan __dirname (karena saat build TS → dist)
const uploadDir = path.resolve('storage/uploads/banner');

// Pastikan folder ada
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/', protectAuth, isAdmin, BannerController.listBanners);
router.get('/:id', protectAuth, isAdmin, BannerController.getBanner);
router.put('/reorder', protectAuth, isAdmin, BannerController.reorderBanners);

router.post('/', protectAuth, isAdmin, upload.single('image'), BannerController.createBanner);
router.put('/:id', protectAuth, isAdmin, upload.single('image'), BannerController.updateBanner);
router.delete('/:id', protectAuth, isAdmin, BannerController.deleteBanner);
export default router;

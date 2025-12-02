import { db } from '../utils/db.server';
import { TBannerRead, TBannerWrite } from '../types/general';
import fs from 'fs';
import path from 'path';

/* ============================================================
   Helper untuk hapus file jika ada
   ============================================================ */
const deleteFileIfExists = (filePath: string) => {
  try {
    if (filePath && fs.existsSync(path.resolve('storage', filePath))) {
      fs.unlinkSync(path.resolve('storage', filePath));
      console.log(`[INFO] Deleted old file: ${filePath}`);
    }
  } catch (err) {
    console.error(`[WARN] Failed to delete file: ${filePath}`, err);
  }
};

/* ============================================================
   LIST ALL
   ============================================================ */
export const listBanners = async (): Promise<TBannerRead[]> => {
  return db.banners.findMany({
    orderBy: { order: 'asc' },
  });
};

/* ============================================================
   GET BY ID
   ============================================================ */
export const getBannerById = async (id: number): Promise<TBannerRead | null> => {
  return db.banners.findUnique({
    where: { banner_id: id },
  });
};

/* ============================================================
   CREATE (Banner baru di posisi paling depan)
   ============================================================ */
export const createBanner = async (data: TBannerWrite): Promise<TBannerRead> => {
  // Geser semua banner lama ke bawah
  await db.banners.updateMany({
    data: { order: { increment: 1 } },
  });
  return db.banners.create({
    data: {
      title: data.title ?? null,
      image_path: data.image_path ?? '',
      is_active: data.is_active ?? true,
      order: 1,
    },
  });
};

/* ============================================================
   UPDATE
   ============================================================ */
export const updateBanner = async (id: number, data: Partial<TBannerWrite>): Promise<TBannerRead> => {
  if (!id || isNaN(id)) {
    throw new Error('Invalid banner ID');
  }

  // Ambil data lama
  const existing = await db.banners.findUnique({
    where: { banner_id: id },
  });

  if (!existing) {
    throw new Error('Banner not found');
  }

  // Jika ada image baru → hapus file lama
  if (data.image_path && existing.image_path && data.image_path !== existing.image_path) {
    deleteFileIfExists(existing.image_path);
  }

  // Filter nilai undefined
  const cleanData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));

  return db.banners.update({
    where: { banner_id: id },
    data: cleanData,
  });
};

/* ============================================================
   DELETE
   ============================================================ */
export const deleteBanner = async (id: number): Promise<TBannerRead> => {
  const existing = await db.banners.findUnique({ where: { banner_id: id } });
  if (!existing) throw new Error('Banner not found');

  // Hapus file dari folder storage
  if (existing.image_path) deleteFileIfExists(existing.image_path);

  return db.banners.delete({
    where: { banner_id: id },
  });
};

/* ============================================================
   REORDER (Drag & Drop)
   ============================================================ */
export const reorderBanners = async (orderedIds: number[]): Promise<void> => {
  if (!orderedIds || !Array.isArray(orderedIds)) {
    throw new Error('Invalid orderedIds');
  }

  await Promise.all(
    orderedIds.map((id, index) => {
      if (!id || isNaN(id)) return null;
      return db.banners.update({
        where: { banner_id: id },
        data: { order: index + 1 },
      });
    })
  );
};

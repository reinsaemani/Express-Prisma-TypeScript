import { Request, Response, NextFunction } from 'express';
import * as BannerService from '../services/banner.service';
import { bannerSchema, bannerUpdateSchema } from '../types/zod';
import { sendSuccessResponse } from '../utils/responseHandler';

export const listBanners = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const banners = await BannerService.listBanners();
    return sendSuccessResponse(res, banners);
  } catch (error) {
    next(error);
  }
};

export const getBanner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const banner = await BannerService.getBannerById(id);
    return sendSuccessResponse(res, banner);
  } catch (error) {
    next(error);
  }
};

export const createBanner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = bannerSchema.parse(req.body);
    const image_path = req.file ? `uploads/banner/${req.file.filename}` : parsed.image_path ?? null;

    const created = await BannerService.createBanner({
      title: parsed.title ?? null,
      image_path: image_path!,
      is_active: parsed.is_active ?? true,
    });

    return sendSuccessResponse(res, created, 'Banner created successfully');
  } catch (error) {
    next(error);
  }
};

export const updateBanner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const parsed = bannerUpdateSchema.parse(req.body);
    const image_path = req.file ? `uploads/banner/${req.file.filename}` : parsed.image_path ?? null;

    const updated = await BannerService.updateBanner(id, {
      title: parsed.title ?? null,
      image_path: image_path ?? undefined,
      is_active: parsed.is_active ?? true,
    });

    return sendSuccessResponse(res, updated, 'Banner updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteBanner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const deleted = await BannerService.deleteBanner(id);
    return sendSuccessResponse(res, deleted, 'Banner deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const reorderBanners = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderedIds } = req.body;
    await BannerService.reorderBanners(orderedIds);
    return sendSuccessResponse(res, null, 'Banners reordered successfully');
  } catch (error) {
    next(error);
  }
};

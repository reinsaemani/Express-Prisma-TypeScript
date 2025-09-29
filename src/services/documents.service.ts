import { db } from "../utils/db.server";
import path from "path";

export const createOrUpdateDocuments = async (
  user_id: number,
  files: {
    cv?: Express.Multer.File[];
    id_card?: Express.Multer.File[];
    certificate?: Express.Multer.File[];
    photo?: Express.Multer.File[];
  }
) => {
  const data: any = {};
  if (files.cv) data.cv_path = path.basename(files.cv[0].path);
  if (files.id_card) data.id_card_path = path.basename(files.id_card[0].path);
  if (files.certificate) data.certificate_path = path.basename(files.certificate[0].path);
  if (files.photo) data.photo_path = path.basename(files.photo[0].path);

  // cek apakah user sudah punya record
  const existing = await db.documents_files.findFirst({
    where: { users: { some: { user_id } } },
  });

  if (existing) {
    return db.documents_files.update({
      where: { documents_files_id: existing.documents_files_id },
      data,
    });
  } else {
    return db.documents_files.create({
      data: {
        ...data,
        users: { connect: { user_id } },
      },
    });
  }
};

export const getDocumentsByUser = async (user_id: number) => {
  return db.documents_files.findFirst({
    where: { users: { some: { user_id } } },
  });
};

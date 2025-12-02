import { db } from '../utils/db.server';
import { TApplicantsDetailsWrite, TApplicantsDetailsRead } from '../types/general';

/* ============================================================
   Utility: Sinkronisasi current_stage otomatis
   ============================================================ */
async function syncApplicantStage(applicants_id: number, vacancy_id: number) {
  // Cek apakah ada record dengan status REJECTED
  const rejected = await db.applicants_details.findFirst({
    where: {
      applicants_id,
      vacancy_id,
      status: 'REJECTED',
    },
    select: { detail_applicants_id: true },
  });

  if (rejected) {
    // 🔥 Kalau ada yang REJECTED, tandai current_stage = REJECTED
    await db.applicants.update({
      where: { applicants_id },
      data: { current_stage: 'REJECTED' },
    });
    return;
  }

  // Kalau belum ada yang rejected, ambil tahapan terbaru
  const latest = await db.applicants_details.findFirst({
    where: { applicants_id, vacancy_id },
    orderBy: [{ updated_at: 'desc' }, { created_at: 'desc' }],
    select: { stage: true },
  });

  await db.applicants.update({
    where: { applicants_id },
    data: { current_stage: latest?.stage ?? null },
  });
}

/* ============================================================
   CRUD utama
   ============================================================ */

export const listApplicantsDetails = async (applicants_id?: number): Promise<TApplicantsDetailsRead[]> => {
  const where = applicants_id ? { applicants_id } : {};
  return db.applicants_details.findMany({
    where,
    orderBy: { schedule_at: 'desc' },
    include: {
      applicant: { include: { user: true } },
      vacancy: true,
    },
  });
};

export const createApplicantsDetail = async (data: TApplicantsDetailsWrite): Promise<TApplicantsDetailsRead> => {
  const created = await db.applicants_details.create({
    data,
    include: {
      applicant: { include: { user: true, vacancy: true } },
      vacancy: true,
    },
  });

  // 🔄 Sinkronisasi current_stage otomatis
  await syncApplicantStage(created.applicants_id, created.vacancy_id);
  return created;
};

export const getApplicantsDetailByID = async (applicants_id: number): Promise<TApplicantsDetailsRead | null> => {
  return db.applicants_details.findUnique({
    where: { detail_applicants_id: applicants_id },
    include: {
      applicant: { include: { user: true } },
      vacancy: true,
    },
  });
};

export const updateApplicantsDetailByID = async (
  id: number,
  data: Partial<TApplicantsDetailsWrite>
): Promise<TApplicantsDetailsRead> => {
  const updated = await db.applicants_details.update({
    where: { detail_applicants_id: id },
    data,
    include: {
      applicant: { include: { user: true, vacancy: true } },
      vacancy: true,
    },
  });

  // 🔄 Sinkronisasi current_stage otomatis
  await syncApplicantStage(updated.applicants_id, updated.vacancy_id);
  return updated;
};

export const deleteApplicantsDetailByID = async (id: number): Promise<TApplicantsDetailsRead> => {
  const deletedInfo = await db.applicants_details.findUnique({
    where: { detail_applicants_id: id },
    select: { applicants_id: true, vacancy_id: true },
  });

  const deleted = await db.applicants_details.delete({ where: { detail_applicants_id: id } });

  if (deletedInfo) {
    await syncApplicantStage(deletedInfo.applicants_id, deletedInfo.vacancy_id);
  }

  return deleted;
};

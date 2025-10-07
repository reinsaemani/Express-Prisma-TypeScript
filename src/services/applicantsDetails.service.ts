import { db } from '../utils/db.server';
import { TApplicantsDetailsWrite, TApplicantsDetailsRead } from '../types/general';

/* ============================================================
   Utility: Sinkronisasi current_stage otomatis
   ============================================================ */
async function syncApplicantStage(applicants_id: number, vacancy_id: number) {
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

export const listAllApplicantsDetails = async (): Promise<TApplicantsDetailsRead[]> => {
  return db.applicants_details.findMany();
};

export const createApplicantsDetail = async (data: TApplicantsDetailsWrite): Promise<TApplicantsDetailsRead> => {
  const created = await db.applicants_details.create({
    data,
    include: {
      applicant: { include: { user: true, vacancy: true } },
      vacancy: true,
    },
  });

  await syncApplicantStage(created.applicants_id, created.vacancy_id);
  return created;
};

export const getApplicantsDetailByID = async (id: number): Promise<TApplicantsDetailsRead | null> => {
  return db.applicants_details.findUnique({ where: { detail_applicants_id: id } });
};

export const listApplicantsDetailsByApplicant = async (applicants_id: number) => {
  return db.applicants_details.findMany({
    where: { applicants_id },
    include: {
      applicant: { include: { user: true } },
      vacancy: true,
    },
    orderBy: {
      schedule_at: 'desc',
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

import { db } from '../utils/db.server';
import { applicants_current_stage, applicants_details_stage } from '@prisma/client';

export const listApplicantsByStage = async (stage?: applicants_current_stage | null) => {
  return db.applicants.findMany({
    where: stage ? { current_stage: stage } : { current_stage: null },
    include: {
      user: { include: { documents: true } },
      vacancy: true,
      details: true,
    },
    orderBy: { created_at: 'desc' },
  });
};

export const moveApplicantToStage = async (
  applicants_id: number,
  newStage: applicants_current_stage,
  schedule_at?: Date | null,
  notes?: string | null
) => {
  return db.applicants.update({
    where: { applicants_id },
    data: {
      current_stage: newStage,
      details: {
        create: {
          stage: newStage as unknown as applicants_details_stage,
          status: 'PENDING',
          schedule_at: schedule_at || null,
          notes: notes || null,
        },
      },
    },
    include: { user: true, vacancy: true, details: true },
  });
};

import { z } from 'zod';
import { vacancies, users, documents_files, account, applicants_details, applicants } from '@prisma/client';

// _____________  Account Schema  _____________

export const accountSchema = z.object({
  username: z.string().min(3).max(100),
  password: z.string().min(6).max(50),
  role: z.enum(['ADMIN', 'PENGAWAS', 'INTERVIEWER']).optional(),
});

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(6).max(50),
});

export const updateRoleSchema = z.object({
  role: z.enum(['ADMIN', 'PENGAWAS', 'INTERVIEWER']),
});

export type TAccountSchema = z.infer<typeof accountSchema>;
export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type TUpdateRoleSchema = z.infer<typeof updateRoleSchema>;

// _____________  Applicants Schema _____________

export const applicantsSchema = z.object({
  user_id: z.number().int(),
  vacancy_id: z.number().int(),
  current_stage: z.enum(['HR_INT', 'SKILL_TEST', 'USER_INT', 'FINAL_INT', 'OFFERING', 'HIRED', 'REJECTED']).optional(),
});

export const applicantsUpdateSchema = applicantsSchema.partial();
export type TApplicantsSchema = z.infer<typeof applicantsSchema>;
export type TApplicantsUpdateSchema = z.infer<typeof applicantsUpdateSchema>;

// _____________  Applicants Details Schema  _____________

export const applicantsDetailsSchema = z.object({
  applicants_id: z.number().int(),
  vacancy_id: z.number().int(),

  stage: z.enum(['HR_INT', 'SKILL_TEST', 'USER_INT', 'FINAL_INT', 'OFFERING']),
  status: z.enum(['RECOMMENDED', 'NOT_RECOMMENDED', 'CONSIDERED', 'HOLD']),

  notes: z.string().nullable().optional(),
  penilaian: z.string().nullable().optional(),
  schedule_at: z.coerce.date().nullable().optional(),
});

export const applicantsDetailsUpdateSchema = applicantsDetailsSchema.partial();

export type TApplicantsDetailsSchema = z.infer<typeof applicantsDetailsSchema>;
export type TApplicantsDetailsUpdateSchema = z.infer<typeof applicantsDetailsUpdateSchema>;

// _____________  User Schema _____________

export const userCreateSchema = z.object({
  NIK: z.string().length(16),

  full_name: z.string().min(1).max(200),
  gender: z.enum(['MALE', 'FEMALE']),
  place_of_birth: z.string().min(1).max(100),
  date_of_birth: z.coerce.date(),

  phone_number: z.string().min(1).max(50),
  email: z.string().email().max(150),
  marital_status: z.string().min(1).max(50),
  religion: z.string().min(1).max(50),
  address: z.string().min(1).max(255),
  village: z.string().min(1).max(100),
  subdistrict: z.string().min(1).max(100),
  district_town: z.string().min(1).max(100),
  province: z.string().min(1).max(100),

  university_school: z.string().min(1).max(150),
  department_faculty: z.string().min(1).max(150),
  study_program: z.string().min(1).max(150),

  educational_level: z.enum(['SMA_SMK', 'Diploma', 'Sarjana', 'Magister']),
  work_experience: z.string().min(1),

  personality_test_url: z.string().url().optional(),
  documents_files_id: z.number().int(),
});

export const userUpdateSchema = userCreateSchema.partial();
export type TuserCreateSchema = z.infer<typeof userCreateSchema>;
export type TuserUpdateSchema = z.infer<typeof userUpdateSchema>;

// _____________  Vacancies Schema  _____________

export const vacanciesTypeEnum = z.enum(['Full_Time', 'Internship', 'Freelance']);
export const vacanciesDegreeEnum = z.enum(['SMP', 'SMA_SMK', 'Diploma', 'Sarjana', 'Magister']);
export const vacanciesLevelEnum = z.enum(['Staff', 'Pejuang']);

export const vacanciesSchema = z.object({
  vacancies_id: z.number().int().positive().optional(), // auto-increment

  title: z.string().min(1).max(200),
  level: vacanciesLevelEnum,
  type: vacanciesTypeEnum,

  degree: vacanciesDegreeEnum.optional(), // nullable di schema Prisma

  qualification: z.string().min(1),
  responsibilities: z.string().min(1),

  documents: z.string().min(1).optional(), // nullable
  benefit: z.string().min(1).optional(), // nullable

  deadline: z.coerce.date(),
  is_open: z.boolean().default(true),
});

export const vacanciesUpdateSchema = vacanciesSchema.partial();

// _____________  Accounts Types  _____________

export type TAccountID = account['account_id'];
export type TAccountRead = Omit<account, 'password_hash'>;
export type TAccountWrite = Omit<account, 'account_id' | 'created_at' | 'updated_at'>;

// ---------- Applicants Types ----------

export type TApplicantsID = applicants['applicants_id'];
export type TApplicantsRead = applicants & {
  user: users;
  vacancy: vacancies;
  details?: applicants_details[];
};
export type TApplicantsWrite = Omit<applicants, 'applicants_id' | 'created_at' | 'updated_at'>;

// _____________  Applicants Detail Types  _____________

export type TApplicantsDetailsID = applicants_details['detail_applicants_id'];
export type TApplicantsDetailsRead = applicants_details;
export type TApplicantsDetailsWrite = Omit<applicants_details, 'detail_applicants_id' | 'created_at' | 'updated_at'>;

// _____________  User Types  _____________

export type TUserID = users['user_id'];
export type TUserRead = users & { documents?: documents_files | null };
export type TUserWrite = Omit<users, 'user_id' | 'created_at' | 'updated_at'>;

// _____________  Vacancies Types  _____________

export type TVacanciesID = vacancies['vacancies_id'];
export type TVacanciesRead = Omit<vacancies, 'created_at' | 'updated_at'> & {
  location?: string | null;
};
export type TVacanciesWrite = Omit<vacancies, 'vacancies_id' | 'created_at' | 'updated_at'>;

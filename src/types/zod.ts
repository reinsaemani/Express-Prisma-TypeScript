import { z } from 'zod';

/* ============================================================
   ACCOUNT SCHEMA
   ============================================================ */
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

/* ============================================================
   APPLICANTS SCHEMA
   ============================================================ */
export const applicantsSchema = z.object({
  user_id: z.number().int(),
  vacancy_id: z.number().int(),
  current_stage: z
    .enum(['SCREENING', 'HR_INT', 'SKILL_TEST', 'USER_INT', 'FINAL_INT', 'OFFERING', 'HIRED', 'REJECTED'])
    .optional(),
});
export const applicantsUpdateSchema = applicantsSchema.partial();

/* ============================================================
   APPLICANTS DETAILS SCHEMA
   ============================================================ */
export const applicantsDetailsSchema = z.object({
  applicants_id: z.coerce.number().int(),
  vacancy_id: z.coerce.number().int(),
  stage: z.enum(['SCREENING', 'HR_INT', 'SKILL_TEST', 'USER_INT', 'FINAL_INT', 'OFFERING', 'HIRED']),
  status: z.enum(['RECOMMENDED', 'NOT_RECOMMENDED', 'CONSIDERED', 'HOLD', 'REJECTED']).nullable().optional(),
  notes: z.string().nullable().optional(),
  penilaian_file_path: z.string().nullable().optional(),
  schedule_at: z.coerce.date().nullable().optional(),
});
export const applicantsDetailsUpdateSchema = applicantsDetailsSchema.partial();

/* ============================================================
   USER SCHEMA
   ============================================================ */
export const userCreateSchema = z.object({
  NIK: z.string().length(16).optional(),
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
  personality_test_url: z.string().url().nullable().optional(),
  documents_files_id: z.number().int().optional(),
});
export const userUpdateSchema = userCreateSchema.partial();

/* ============================================================
   VACANCIES SCHEMA
   ============================================================ */
export const vacanciesTypeEnum = z.enum(['Full_Time', 'Internship', 'Freelance']);
export const vacanciesDegreeEnum = z.enum(['SMP', 'SMA_SMK', 'Diploma', 'Sarjana', 'Magister']);
export const vacanciesLevelEnum = z.enum(['Staff', 'Pejuang']);

export const vacanciesSchema = z.object({
  title: z.string().min(1).max(200),
  level: vacanciesLevelEnum,
  type: vacanciesTypeEnum,
  degree: vacanciesDegreeEnum.optional(),
  qualification: z.string().min(1),
  responsibilities: z.string().min(1),
  documents: z.string().optional(),
  benefit: z.string().optional(),
  deadline: z.coerce.date(),
  is_open: z.boolean().default(true),
});
export const vacanciesUpdateSchema = vacanciesSchema.partial();

/* ============================================================
   BANNER SCHEMA
   ============================================================ */
export const bannerSchema = z.object({
  title: z.string().max(150).nullable().optional(),
  image_path: z.string().optional(),
  is_active: z.coerce.boolean().default(true),
});
export const bannerUpdateSchema = bannerSchema.partial();

/* ============================================================
   TESTIMONIALS SCHEMA (Optional Next)
   ============================================================ */
export const testimonialSchema = z.object({
  name: z.string().min(1).max(150),
  message: z.string().min(1),
  photo_path: z.string().optional(),
  position: z.string().max(100).optional(),
  is_active: z.coerce.boolean().default(true),
});
export const testimonialUpdateSchema = testimonialSchema.partial();

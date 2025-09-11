import { z } from 'zod';


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
  current_stage: z.enum([
    'HR_INT',
    'SKILL_TEST',
    'USER_INT',
    'FINAL_INT',
    'OFFERING',
    'HIRED',
    'REJECTED',
  ]).optional(),
});

export const applicantsUpdateSchema = applicantsSchema.partial();

// _____________  Applicants Details Schema  _____________

export const applicantsDetailsSchema = z.object({
  applicants_id: z.number().int(),
  stage: z.enum(['HR_INT', 'SKILL_TEST', 'USER_INT', 'FINAL_INT', 'OFFERING']),
  attempt_no: z.number().int().optional().default(1),
  status: z.enum(['PENDING', 'PASSED', 'FAILED', 'SKIPPED']).optional(),
  notes: z.string().nullable().optional(),
  penilaian: z.string().nullable().optional(),
  schedule_at: z.date().nullable().optional(),
});

export const applicantsDetailsUpdateSchema = applicantsDetailsSchema.partial();

export type TApplicantsDetailsSchema = z.infer<typeof applicantsDetailsSchema>;
export type TApplicantsDetailsUpdateSchema = z.infer<typeof applicantsDetailsUpdateSchema>;
export type TApplicantsSchema = z.infer<typeof applicantsSchema>;
export type TApplicantsUpdateSchema = z.infer<typeof applicantsUpdateSchema>;



// _____________  User Schema _____________

export const userCreateSchema = z.object({
  NIK: z.string().max(32).optional(),
  full_name: z.string().min(1).max(200),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  place_of_birth: z.string().max(100).optional(),
  date_of_birth: z.string().datetime().optional(), // ISO string
  phone_number: z.string().max(50).optional(),
  email: z.string().email().max(150).optional(),
  marital_status: z.string().max(50).optional(),
  religion: z.string().max(50).optional(),
  address: z.string().max(255).optional(),
  village: z.string().max(100).optional(),
  subdistrict: z.string().max(100).optional(),
  district_town: z.string().max(100).optional(),
  province: z.string().max(100).optional(),
  university_school: z.string().max(150).optional(),
  department_faculty: z.string().max(150).optional(),
  study_program: z.string().max(150).optional(),
  educational_level: z.enum(["SMA_SMK", "Diploma", "Sarjana", "Magister"]).optional(),
  work_experience: z.string().optional(),
  personality_test_url: z.string().url().optional(),
  documents_files_id: z.number().optional(),
});

export const userUpdateSchema = userCreateSchema.partial();

export type TuserCreateSchema = z.infer<typeof userCreateSchema>;
export type TuserUpdateSchema = z.infer<typeof userUpdateSchema>;

// _____________  Author Schema  _____________

export const vacanciesTypeEnum = z.enum(["Full_Time", "Part_Time", "Freelance"]);
export const vacanciesDegreeEnum = z.enum(["SMA_SMK", "Diploma", "Sarjana", "Magister"]);

export const vacanciesSchema = z.object({
  vacancies_id: z.number().int().positive().optional(), // autoincrement, optional ketika create
  title: z.string()
    .min(1, { message: "Title must be at least 1 character long" })
    .max(200, { message: "Title cannot exceed 200 characters" }),
  location: z.string().max(150, { message: "Location cannot exceed 150 characters" }).optional().nullable(),
  type: vacanciesTypeEnum, // Full_Time | Part_Time | Freelance
  degree: vacanciesDegreeEnum.optional().nullable(), // SMA/SMK | Diploma | Sarjana | Magister
  qualification: z.string().optional().nullable(),
  responsibilities: z.string().optional().nullable(),
  documents: z.string().optional().nullable(),
  benefit: z.string().optional().nullable(),
  deadline: z.coerce.date().optional().nullable(), // coerce biar string -> Date bisa otomatis
  is_open: z.boolean().default(true),
});
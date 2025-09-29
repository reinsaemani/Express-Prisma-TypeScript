import { z } from "zod";

// _____________  Account Schema  _____________

export const accountSchema = z.object({
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(100, { message: "Username cannot exceed 100 characters" }),

  password: z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password cannot exceed 50 characters" }),

  role: z.enum(["ADMIN", "PENGAWAS", "INTERVIEWER"]).optional(),
});

export const resetPasswordSchema = z.object({
  newPassword: z.string()
    .min(6, { message: "New password must be at least 6 characters long" })
    .max(50, { message: "New password cannot exceed 50 characters" }),
});

export const updateRoleSchema = z.object({
  role: z.enum(["ADMIN", "PENGAWAS", "INTERVIEWER"], {
    required_error: "Role is required",
  }),
});

export type TAccountSchema = z.infer<typeof accountSchema>;
export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type TUpdateRoleSchema = z.infer<typeof updateRoleSchema>;

// _____________  Applicants Schema _____________

export const applicantsSchema = z.object({
  user_id: z.number({
    required_error: "User ID is required",
    invalid_type_error: "User ID must be a number",
  }).int(),

  vacancy_id: z.number({
    required_error: "Vacancy ID is required",
    invalid_type_error: "Vacancy ID must be a number",
  }).int(),

  current_stage: z.enum(
    ["HR_INT", "SKILL_TEST", "USER_INT", "FINAL_INT", "OFFERING", "HIRED", "REJECTED"],
    { invalid_type_error: "Invalid applicant stage" }
  ).optional(),
});

export const applicantsUpdateSchema = applicantsSchema.partial();

// _____________  Applicants Details Schema  _____________

export const applicantsDetailsSchema = z.object({
  applicants_id: z.number({
    required_error: "Applicants ID is required",
    invalid_type_error: "Applicants ID must be a number",
  }).int(),

  stage: z.enum(["HR_INT", "SKILL_TEST", "USER_INT", "FINAL_INT", "OFFERING"], {
    required_error: "Stage is required",
    invalid_type_error: "Invalid stage",
  }),

  attempt_no: z.number().int().optional().default(1),

  status: z.enum(["PENDING", "PASSED", "FAILED", "SKIPPED"], {
    invalid_type_error: "Invalid status",
  }).optional(),

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
  NIK: z.string()
  .min(16, { message: "NIK must be exactly 16 characters long" })
  .max(16, { message: "NIK must be exactly 16 characters long" }),
  
  full_name: z.string()
    .min(1, { message: "Full name is required" })
    .max(200, { message: "Full name cannot exceed 200 characters" }),

  gender: z.enum(["MALE", "FEMALE"], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be either MALE or FEMALE",
  }),

  place_of_birth: z.string()
    .min(1, { message: "Place of birth is required" })
    .max(100, { message: "Place of birth cannot exceed 100 characters" }),

  date_of_birth: z.string({
    required_error: "Date of birth is required",
    invalid_type_error: "Date of birth must be a valid ISO date string",
  }).datetime(),

  phone_number: z.string()
    .min(1, { message: "Phone number is required" })
    .max(50, { message: "Phone number cannot exceed 50 characters" }),

  email: z.string()
    .email({ message: "Email must be a valid email address" })
    .max(150, { message: "Email cannot exceed 150 characters" }),

  marital_status: z.string()
    .min(1, { message: "Marital status is required" })
    .max(50, { message: "Marital status cannot exceed 50 characters" }),

  religion: z.string()
    .min(1, { message: "Religion is required" })
    .max(50, { message: "Religion cannot exceed 50 characters" }),

  address: z.string()
    .min(1, { message: "Address is required" })
    .max(255, { message: "Address cannot exceed 255 characters" }),

  village: z.string()
    .min(1, { message: "Village is required" })
    .max(100, { message: "Village cannot exceed 100 characters" }),

  subdistrict: z.string()
    .min(1, { message: "Subdistrict is required" })
    .max(100, { message: "Subdistrict cannot exceed 100 characters" }),

  district_town: z.string()
    .min(1, { message: "District/Town is required" })
    .max(100, { message: "District/Town cannot exceed 100 characters" }),

  province: z.string()
    .min(1, { message: "Province is required" })
    .max(100, { message: "Province cannot exceed 100 characters" }),

  university_school: z.string()
    .min(1, { message: "University/School is required" })
    .max(150, { message: "University/School cannot exceed 150 characters" }),

  department_faculty: z.string()
    .min(1, { message: "Department/Faculty is required" })
    .max(150, { message: "Department/Faculty cannot exceed 150 characters" }),

  study_program: z.string()
    .min(1, { message: "Study program is required" })
    .max(150, { message: "Study program cannot exceed 150 characters" }),

  educational_level: z.enum(
    ["SMA_SMK", "Diploma", "Sarjana", "Magister"],
    {
      required_error: "Educational level is required",
      invalid_type_error: "Invalid educational level",
    }
  ),

  work_experience: z.string()
    .min(1, { message: "Work experience is required" }),

  personality_test_url: z.string()
    .url({ message: "Personality test URL must be valid" })
    .optional(),

  documents_files_id: z.number({
    required_error: "Documents file ID is required",
    invalid_type_error: "Documents file ID must be a number",
  }),
});

export const userUpdateSchema = userCreateSchema.partial();


export type TuserCreateSchema = z.infer<typeof userCreateSchema>;
export type TuserUpdateSchema = z.infer<typeof userUpdateSchema>;

// _____________  Vacancies Schema  _____________

export const vacanciesTypeEnum = z.enum(["Full_Time", "Part_Time", "Freelance"]);
export const vacanciesDegreeEnum = z.enum(["SMA_SMK", "Diploma", "Sarjana", "Magister"]);

export const vacanciesSchema = z.object({
  vacancies_id: z.number().int().positive().optional(), // still optional because auto-increment

  title: z.string()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title cannot exceed 200 characters" }),

  location: z.string()
    .min(1, { message: "Location is required" })
    .max(150, { message: "Location cannot exceed 150 characters" }),

  type: vacanciesTypeEnum, // Full_Time | Part_Time | Freelance
  degree: vacanciesDegreeEnum, // must be selected

  qualification: z.string()
    .min(1, { message: "Qualification is required" }),

  responsibilities: z.string()
    .min(1, { message: "Responsibilities are required" }),

  documents: z.string()
    .min(1, { message: "Documents are required" }),

  benefit: z.string()
    .min(1, { message: "Benefit is required" }),

  deadline: z.coerce.date({
    required_error: "Deadline is required",
    invalid_type_error: "Deadline must be a valid date",
  }),

  is_open: z.boolean().default(true),
});

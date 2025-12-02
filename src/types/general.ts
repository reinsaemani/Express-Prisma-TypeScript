import { account, applicants, applicants_details, banners, documents_files, users, vacancies } from '@prisma/client';

/* ============================================================
   ACCOUNT TYPES
   ============================================================ */
export type TAccountID = account['account_id'];
export type TAccountRead = Omit<account, 'password_hash'>;
export type TAccountWrite = Omit<account, 'account_id' | 'created_at' | 'updated_at'>;

/* ============================================================
   APPLICANTS TYPES
   ============================================================ */
export type TApplicantsID = applicants['applicants_id'];
export type TApplicantsRead = applicants & {
  user: users;
  vacancy: vacancies;
  details?: applicants_details[];
};
export type TApplicantsWrite = Omit<applicants, 'applicants_id' | 'created_at' | 'updated_at'>;

/* ============================================================
   APPLICANTS DETAILS TYPES
   ============================================================ */
export type TApplicantsDetailsID = applicants_details['detail_applicants_id'];
export type TApplicantsDetailsRead = applicants_details;
export type TApplicantsDetailsWrite = Omit<applicants_details, 'detail_applicants_id' | 'created_at' | 'updated_at'> &
  Partial<Pick<applicants_details, 'penilaian_file_path'>>;

/* ============================================================
   USER TYPES
   ============================================================ */
export type TUserID = users['user_id'];
export type TUserRead = users & { documents?: documents_files | null };
export type TUserWrite = Omit<users, 'user_id' | 'created_at' | 'updated_at'>;

/* ============================================================
   VACANCIES TYPES
   ============================================================ */
export type TVacanciesID = vacancies['vacancies_id'];
export type TVacanciesRead = Omit<vacancies, 'created_at' | 'updated_at'> & {
  location?: string | null;
};
export type TVacanciesWrite = Omit<vacancies, 'vacancies_id' | 'created_at' | 'updated_at'>;

/* ============================================================
   BANNER TYPES
   ============================================================ */
export type TBannerID = banners['banner_id'];
export type TBannerRead = banners;
export type TBannerWrite = Omit<banners, 'banner_id' | 'created_at' | 'updated_at' | 'order'> & {
  title?: string | null;
  image_path?: string | null;
  is_active?: boolean;
};

/* ============================================================
   TESTIMONIALS TYPES (Optional Next)
   ============================================================ */
export type TTestimonialID = number;
export type TTestimonialRead = {
  testimonial_id: number;
  name: string;
  message: string;
  photo_path: string | null;
  position: string | null;
  is_active: boolean;
  order: number;
  created_at: Date;
  updated_at: Date;
};
export type TTestimonialWrite = Omit<TTestimonialRead, 'testimonial_id' | 'created_at' | 'updated_at' | 'order'>;

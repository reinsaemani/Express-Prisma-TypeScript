import { vacancies, users, documents_files, account, applicants_details, applicants } from '@prisma/client';

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

// // _____________  User Types  _____________

export type TUserID = users['user_id'];
export type TUserRead = users & { documents?: documents_files | null };
export type TUserWrite = Omit<users, 'user_id' | 'created_at' | 'updated_at'>;

// export type TUserRegisterWrite = Omit<User, 'createdAt' | 'updatedAt'>;
// export type TloginRead = Omit<User, 'createdAt' | 'updatedAt'>;
// export type TloginRequest = Omit<User, 'createdAt' | 'updatedAt' | 'password'>;

// _____________  Vacancies Types  _____________

export type TVacanciesID = vacancies['vacancies_id'];
export type TVacanciesRead = Omit<vacancies, 'created_at' | 'updated_at'> & {
  location?: string | null;
};
export type TVacanciesWrite = Omit<vacancies, 'vacancies_id' | 'created_at' | 'updated_at'>;

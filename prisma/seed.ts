// prisma/seed.ts
import { db } from '../src/utils/db.server';
import { hashPassword } from '../src/utils/bcryptHandler';

async function seed() {
  // Bersihkan tabel (urutan penting karena ada relasi)
  await db.applicants_details.deleteMany();
  await db.applicants.deleteMany();
  await db.users.deleteMany();
  await db.vacancies.deleteMany();
  await db.account.deleteMany();
  await db.documents_files.deleteMany();

  console.log('[*] Deleted all records');

  // Seed account (ADMIN, PENGAWAS, INTERVIEWER)
  const adminPassword = await hashPassword('admin123');
  const pengawasPassword = await hashPassword('pengawas123');
  const interviewerPassword = await hashPassword('interviewer123');

  const admin = await db.account.create({
    data: {
      username: 'admin',
      password_hash: adminPassword,
      role: 'ADMIN',
    },
  });

  const pengawas = await db.account.create({
    data: {
      username: 'pengawas',
      password_hash: pengawasPassword,
      role: 'PENGAWAS',
    },
  });

  const interviewer = await db.account.create({
    data: {
      username: 'interviewer',
      password_hash: interviewerPassword,
      role: 'INTERVIEWER',
    },
  });

  console.log('[*] Seeded accounts');

  // Seed users
  const user1 = await db.users.create({
    data: {
      full_name: 'John Doe',
      email: 'johndoe@mail.com',
      gender: 'MALE',
      phone_number: '08123456789',
    },
  });

  const user2 = await db.users.create({
    data: {
      full_name: 'Jane Smith',
      email: 'jane@mail.com',
      gender: 'FEMALE',
      phone_number: '08987654321',
    },
  });

  console.log('[*] Seeded users');

  // Seed vacancies
  const vacancy1 = await db.vacancies.create({
    data: {
      title: 'Software Engineer',
      type: 'Full_Time',
      degree: 'Sarjana',
      qualification: 'Menguasai TypeScript & Node.js',
      responsibilities: 'Develop backend services',
      deadline: new Date('2025-12-31'),
    },
  });

  const vacancy2 = await db.vacancies.create({
    data: {
      title: 'Data Analyst',
      type: 'Part_Time',
      degree: 'Diploma',
      qualification: 'Menguasai SQL & Python',
      responsibilities: 'Analisis data untuk laporan bisnis',
      deadline: new Date('2025-11-30'),
    },
  });

  console.log('[*] Seeded vacancies');

  // Seed applicants
  const applicant1 = await db.applicants.create({
    data: {
      user_id: user1.user_id,
      vacancy_id: vacancy1.vacancies_id,
      current_stage: 'HR_INT',
    },
  });

  const applicant2 = await db.applicants.create({
    data: {
      user_id: user2.user_id,
      vacancy_id: vacancy2.vacancies_id,
      current_stage: 'SKILL_TEST',
    },
  });

  console.log('[*] Seeded applicants');

  // Seed applicants_details
  await db.applicants_details.create({
    data: {
      applicants_id: applicant1.applicants_id,
      stage: 'HR_INT',
      status: 'PASSED',
      notes: 'Good communication skills',
    },
  });

  await db.applicants_details.create({
    data: {
      applicants_id: applicant2.applicants_id,
      stage: 'SKILL_TEST',
      status: 'PENDING',
      notes: 'Waiting for test result',
    },
  });

  console.log('[*] Seeded applicants_details');

  console.log('✅ Seeding completed');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

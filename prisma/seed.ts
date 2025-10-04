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

  await db.account.createMany({
    data: [
      { username: 'admin', password_hash: adminPassword, role: 'ADMIN' },
      { username: 'pengawas', password_hash: pengawasPassword, role: 'PENGAWAS' },
      { username: 'interviewer', password_hash: interviewerPassword, role: 'INTERVIEWER' },
    ],
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
      benefit: 'BPJS + Makan Siang',
      deadline: new Date('2025-12-31'),
      level: 'Staff',
    },
  });

  const vacancy2 = await db.vacancies.create({
    data: {
      title: 'IT Support',
      type: 'Full_Time',
      degree: 'Diploma',
      qualification: 'Menguasai Hardware & Network',
      responsibilities: 'Handle troubleshooting & support',
      benefit: 'BPJS + Tunjangan Transport',
      deadline: new Date('2025-11-30'),
      level: 'Staff',
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
      user_id: user1.user_id, // user yang sama apply vacancy lain
      vacancy_id: vacancy2.vacancies_id,
      current_stage: 'SKILL_TEST',
    },
  });

  const applicant3 = await db.applicants.create({
    data: {
      user_id: user2.user_id,
      vacancy_id: vacancy1.vacancies_id,
      current_stage: 'SKILL_TEST',
    },
  });

  console.log('[*] Seeded applicants');

  // Seed applicants_details
  await db.applicants_details.create({
    data: {
      applicants_id: applicant1.applicants_id,
      vacancy_id: vacancy1.vacancies_id,
      stage: 'SKILL_TEST',
      status: 'NOT_RECOMMENDED',
      penilaian: '60/100',
      notes: 'Kurang di algo test',
      schedule_at: new Date('2025-10-10'),
    },
  });

  await db.applicants_details.create({
    data: {
      applicants_id: applicant2.applicants_id,
      vacancy_id: vacancy2.vacancies_id,
      stage: 'SKILL_TEST',
      status: 'RECOMMENDED',
      penilaian: '85/100',
      notes: 'Bagus troubleshooting',
      schedule_at: new Date('2025-10-12'),
    },
  });

  await db.applicants_details.create({
    data: {
      applicants_id: applicant3.applicants_id,
      vacancy_id: vacancy1.vacancies_id,
      stage: 'SKILL_TEST',
      status: 'CONSIDERED',
      penilaian: '75/100',
      notes: 'Cukup baik, perlu observasi lebih lanjut',
      schedule_at: new Date('2025-10-15'),
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

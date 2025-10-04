-- CreateTable
CREATE TABLE `account` (
    `account_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'PENGAWAS', 'INTERVIEWER') NOT NULL DEFAULT 'ADMIN',
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applicants` (
    `applicants_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `vacancy_id` INTEGER NOT NULL,
    `current_stage` ENUM('HR_INT', 'SKILL_TEST', 'USER_INT', 'FINAL_INT', 'OFFERING', 'HIRED', 'REJECTED') NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `fk_app_vacancy`(`vacancy_id`),
    UNIQUE INDEX `uniq_user_vacancy`(`user_id`, `vacancy_id`),
    PRIMARY KEY (`applicants_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applicants_details` (
    `detail_applicants_id` INTEGER NOT NULL AUTO_INCREMENT,
    `applicants_id` INTEGER NOT NULL,
    `stage` ENUM('HR_INT', 'SKILL_TEST', 'USER_INT', 'FINAL_INT', 'OFFERING') NOT NULL,
    `attempt_no` INTEGER NOT NULL DEFAULT 1,
    `status` ENUM('PENDING', 'PASSED', 'FAILED', 'SKIPPED') NOT NULL DEFAULT 'PENDING',
    `notes` TEXT NULL,
    `penilaian` TEXT NULL,
    `schedule_at` DATETIME(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `applicants_details_applicants_id_fkey`(`applicants_id`),
    PRIMARY KEY (`detail_applicants_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documents_files` (
    `documents_files_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cv_path` VARCHAR(255) NULL,
    `id_card_path` VARCHAR(255) NULL,
    `certificate_path` VARCHAR(255) NULL,
    `photo_path` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`documents_files_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `NIK` VARCHAR(16) NULL,
    `full_name` VARCHAR(200) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NULL,
    `place_of_birth` VARCHAR(100) NULL,
    `date_of_birth` DATE NULL,
    `documents_files_id` INTEGER NULL,
    `phone_number` VARCHAR(50) NULL,
    `email` VARCHAR(150) NULL,
    `marital_status` VARCHAR(50) NULL,
    `religion` VARCHAR(50) NULL,
    `address` VARCHAR(255) NULL,
    `village` VARCHAR(100) NULL,
    `subdistrict` VARCHAR(100) NULL,
    `district_town` VARCHAR(100) NULL,
    `province` VARCHAR(100) NULL,
    `university_school` VARCHAR(150) NULL,
    `department_faculty` VARCHAR(150) NULL,
    `study_program` VARCHAR(150) NULL,
    `educational_level` ENUM('SMP', 'SMA/SMK', 'Diploma', 'Sarjana', 'Magister') NULL,
    `work_experience` TEXT NULL,
    `banned_until` DATE NULL,
    `personality_test_url` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL,
    `GPA_grades` INTEGER NULL,

    UNIQUE INDEX `NIK`(`NIK`),
    UNIQUE INDEX `email`(`email`),
    INDEX `users_documents_files_id_fkey`(`documents_files_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vacancies` (
    `vacancies_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `type` ENUM('Full-Time', 'Internship', 'Freelance') NOT NULL,
    `degree` ENUM('SMP', 'SMA_SMK', 'Diploma', 'Sarjana', 'Magister') NULL,
    `qualification` TEXT NULL,
    `responsibilities` TEXT NULL,
    `documents` TEXT NULL,
    `benefit` TEXT NULL,
    `deadline` DATE NULL,
    `level` ENUM('Staff', 'Pejuang') NULL,
    `is_open` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`vacancies_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_documents_files_id_fkey` FOREIGN KEY (`documents_files_id`) REFERENCES `documents_files`(`documents_files_id`) ON DELETE SET NULL ON UPDATE CASCADE;

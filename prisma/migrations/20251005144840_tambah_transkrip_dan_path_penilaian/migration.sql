/*
  Warnings:

  - You are about to drop the column `penilaian` on the `applicants_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `applicants_details` DROP COLUMN `penilaian`,
    ADD COLUMN `penilaian_file_path` VARCHAR(255) NULL,
    MODIFY `stage` ENUM('HR_INT', 'SKILL_TEST', 'USER_INT', 'FINAL_INT', 'OFFERING', 'HIRED', 'REJECTED') NOT NULL;

-- AlterTable
ALTER TABLE `documents_files` ADD COLUMN `transcript_path` VARCHAR(255) NULL;

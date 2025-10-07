/*
  Warnings:

  - The values [REJECTED] on the enum `applicants_current_stage` will be removed. If these variants are still used in the database, this will fail.
  - The values [REJECTED] on the enum `applicants_details_stage` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `applicants` MODIFY `current_stage` ENUM('SCREENING', 'HR_INT', 'SKILL_TEST', 'USER_INT', 'FINAL_INT', 'OFFERING', 'HIRED') NULL;

-- AlterTable
ALTER TABLE `applicants_details` MODIFY `stage` ENUM('SCREENING', 'HR_INT', 'SKILL_TEST', 'USER_INT', 'FINAL_INT', 'OFFERING', 'HIRED') NOT NULL,
    MODIFY `status` ENUM('RECOMMENDED', 'NOT_RECOMMENDED', 'CONSIDERED', 'HOLD', 'REJECTED') NULL;

/*
  Warnings:

  - You are about to drop the column `attempt_no` on the `applicants_details` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `applicants_details` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(6))` to `Enum(EnumId(3))`.
  - Added the required column `vacancy_id` to the `applicants_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `applicants_details` DROP COLUMN `attempt_no`,
    ADD COLUMN `vacancy_id` INTEGER NOT NULL,
    MODIFY `status` ENUM('RECOMMENDED', 'NOT_RECOMMENDED', 'CONSIDERED', 'HOLD') NOT NULL,
    MODIFY `penilaian` VARCHAR(50) NULL;

-- CreateIndex
CREATE INDEX `applicants_details_vacancy_id_fkey` ON `applicants_details`(`vacancy_id`);

-- AddForeignKey
ALTER TABLE `applicants` ADD CONSTRAINT `applicants_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applicants` ADD CONSTRAINT `applicants_vacancy_id_fkey` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancies`(`vacancies_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applicants_details` ADD CONSTRAINT `applicants_details_applicants_id_fkey` FOREIGN KEY (`applicants_id`) REFERENCES `applicants`(`applicants_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applicants_details` ADD CONSTRAINT `applicants_details_vacancy_id_fkey` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancies`(`vacancies_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropIndex
DROP INDEX `applicants_details_applicants_id_fkey` ON `applicants_details`;

-- DropIndex
DROP INDEX `users_documents_files_id_fkey` ON `users`;

-- AddForeignKey
ALTER TABLE `applicants` ADD CONSTRAINT `applicants_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applicants` ADD CONSTRAINT `applicants_vacancy_id_fkey` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancies`(`vacancies_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applicants_details` ADD CONSTRAINT `applicants_details_applicants_id_fkey` FOREIGN KEY (`applicants_id`) REFERENCES `applicants`(`applicants_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_documents_files_id_fkey` FOREIGN KEY (`documents_files_id`) REFERENCES `documents_files`(`documents_files_id`) ON DELETE SET NULL ON UPDATE CASCADE;

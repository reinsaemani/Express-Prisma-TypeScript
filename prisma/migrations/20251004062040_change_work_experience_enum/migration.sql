/*
  Warnings:

  - You are about to alter the column `work_experience` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Enum(EnumId(6))`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `work_experience` ENUM('fresh_graduates', '1 - 3 years', '3 - 5 years', '> 5 years') NULL;

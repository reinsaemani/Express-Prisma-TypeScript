/*
  Warnings:

  - Made the column `updated_at` on table `documents_files` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `documents_files` MODIFY `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

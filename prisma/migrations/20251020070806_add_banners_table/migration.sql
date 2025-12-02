/*
  Warnings:

  - The values [fresh_graduates] on the enum `users_work_experience` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `work_experience` ENUM('fresh graduates', '1 - 3 years', '3 - 5 years', '> 5 years') NULL;

-- CreateTable
CREATE TABLE `banners` (
    `banner_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(150) NULL,
    `image_path` VARCHAR(255) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`banner_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

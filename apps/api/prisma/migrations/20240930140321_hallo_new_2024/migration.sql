/*
  Warnings:

  - You are about to drop the column `createdAt` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `userprofileId` on the `image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `image_userprofileId_fkey`;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `createdAt`,
    DROP COLUMN `userprofileId`;

-- AlterTable
ALTER TABLE `userprofile` ADD COLUMN `image` VARCHAR(500) NULL;

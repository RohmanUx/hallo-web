/*
  Warnings:

  - Made the column `userprofileId` on table `image` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `image_userprofileId_fkey`;

-- AlterTable
ALTER TABLE `image` MODIFY `userprofileId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_userprofileId_fkey` FOREIGN KEY (`userprofileId`) REFERENCES `userprofile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

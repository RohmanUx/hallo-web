/*
  Warnings:

  - You are about to drop the column `image` on the `userprofile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `image` ADD COLUMN `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `userprofileId` INTEGER NULL;

-- AlterTable
ALTER TABLE `userprofile` DROP COLUMN `image`;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_userprofileId_fkey` FOREIGN KEY (`userprofileId`) REFERENCES `userprofile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

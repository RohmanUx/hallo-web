/*
  Warnings:

  - Made the column `eventId` on table `image` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `image_eventId_fkey`;

-- AlterTable
ALTER TABLE `image` ADD COLUMN `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `eventId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

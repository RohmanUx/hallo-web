-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `image_eventId_fkey`;

-- AlterTable
ALTER TABLE `image` MODIFY `eventId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `image_userprofileId_fkey`;

-- AlterTable
ALTER TABLE `image` MODIFY `userprofileId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_userprofileId_fkey` FOREIGN KEY (`userprofileId`) REFERENCES `userprofile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[bookId]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookId` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reviews` ADD COLUMN `bookId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Reviews_bookId_key` ON `Reviews`(`bookId`);

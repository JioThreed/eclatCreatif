/*
  Warnings:

  - You are about to drop the column `suspendedBy` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "suspendedBy",
ADD COLUMN     "suspendedById" TEXT;

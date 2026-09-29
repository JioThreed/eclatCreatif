/*
  Warnings:

  - Added the required column `label` to the `UserRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserRole"
ADD COLUMN "label" TEXT;

ALTER TABLE "UserRole"
ADD COLUMN "description" TEXT;

UPDATE "UserRole"
SET "label" =
CASE
  WHEN "name" = 'SUPER_ADMIN'
    THEN 'Super Administrateur'

  WHEN "name" = 'ADMIN'
    THEN 'Administrateur'

  WHEN "name" = 'MODERATOR'
    THEN 'Modérateur'

  WHEN "name" = 'USER'
    THEN 'Utilisateur'

  ELSE "name"
END;

ALTER TABLE "UserRole"
ALTER COLUMN "label"
SET NOT NULL;

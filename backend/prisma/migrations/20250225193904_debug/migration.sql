/*
  Warnings:

  - Added the required column `email` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `instructors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "instructors" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "email" TEXT NOT NULL;

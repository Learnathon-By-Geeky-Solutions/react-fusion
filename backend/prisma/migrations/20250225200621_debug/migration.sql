/*
  Warnings:

  - Added the required column `OTP` to the `instructors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `OTP` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "instructors" ADD COLUMN     "OTP" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "OTP" TEXT NOT NULL;

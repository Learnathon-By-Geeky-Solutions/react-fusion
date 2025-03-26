/*
  Warnings:

  - The primary key for the `CourseStudent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `coureId` on the `CourseStudent` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `CourseStudent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseStudent" DROP CONSTRAINT "CourseStudent_coureId_fkey";

-- AlterTable
ALTER TABLE "CourseStudent" DROP CONSTRAINT "CourseStudent_pkey",
DROP COLUMN "coureId",
ADD COLUMN     "courseId" TEXT NOT NULL,
ADD CONSTRAINT "CourseStudent_pkey" PRIMARY KEY ("courseId", "studentId");

-- AddForeignKey
ALTER TABLE "CourseStudent" ADD CONSTRAINT "CourseStudent_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

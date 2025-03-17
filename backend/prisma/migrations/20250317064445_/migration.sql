/*
  Warnings:

  - You are about to drop the column `lessionId` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `lessionId` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `descriptions` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moduleId` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moduleId` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_lessionId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_lessionId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_lessionId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "descriptions" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "lessionId",
ADD COLUMN     "moduleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "lessionId",
ADD COLUMN     "moduleId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Lesson";

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[instructorId]` on the table `instructor_analytics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `instructorAnalyticsId` to the `instructors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "instructor_analytics" DROP CONSTRAINT "instructor_analytics_instructorId_fkey";

-- AlterTable
ALTER TABLE "instructors" ADD COLUMN     "instructorAnalyticsId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "instructor_analytics_instructorId_key" ON "instructor_analytics"("instructorId");

-- AddForeignKey
ALTER TABLE "instructor_analytics" ADD CONSTRAINT "instructor_analytics_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructors"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

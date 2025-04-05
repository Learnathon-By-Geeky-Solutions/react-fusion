/*
  Warnings:

  - You are about to drop the column `instructorAnalyticsId` on the `instructors` table. All the data in the column will be lost.
  - You are about to drop the `course_analytics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `instructor_analytics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "course_analytics" DROP CONSTRAINT "course_analytics_courseId_fkey";

-- DropForeignKey
ALTER TABLE "instructor_analytics" DROP CONSTRAINT "instructor_analytics_instructorId_fkey";

-- AlterTable
ALTER TABLE "instructors" DROP COLUMN "instructorAnalyticsId";

-- DropTable
DROP TABLE "course_analytics";

-- DropTable
DROP TABLE "instructor_analytics";

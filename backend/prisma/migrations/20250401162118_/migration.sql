/*
  Warnings:

  - A unique constraint covering the columns `[studentId,courseId]` on the table `course_progress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "course_progress_studentId_courseId_key" ON "course_progress"("studentId", "courseId");

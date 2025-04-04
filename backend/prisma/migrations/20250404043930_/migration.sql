/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `student_analytics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "student_analytics_studentId_key" ON "student_analytics"("studentId");

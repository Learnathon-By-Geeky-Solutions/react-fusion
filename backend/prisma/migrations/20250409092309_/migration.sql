/*
  Warnings:

  - A unique constraint covering the columns `[courseId,studentId]` on the table `Transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Transactions_courseId_studentId_key" ON "Transactions"("courseId", "studentId");

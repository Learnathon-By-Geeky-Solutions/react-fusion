/*
  Warnings:

  - You are about to drop the column `completed` on the `quiz_progress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseProgressId,quizId]` on the table `quiz_progress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isCompleted` to the `quiz_progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quiz_progress" DROP COLUMN "completed",
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "quiz_progress_courseProgressId_quizId_key" ON "quiz_progress"("courseProgressId", "quizId");

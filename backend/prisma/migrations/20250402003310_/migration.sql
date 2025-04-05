/*
  Warnings:

  - A unique constraint covering the columns `[courseProgressId]` on the table `video_progress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "video_progress_courseProgressId_key" ON "video_progress"("courseProgressId");

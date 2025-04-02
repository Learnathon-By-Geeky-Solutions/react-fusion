/*
  Warnings:

  - A unique constraint covering the columns `[courseProgressId,milestoneId]` on the table `milestone_progress` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseProgressId,moduleId]` on the table `module_progress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "milestone_progress_courseProgressId_milestoneId_key" ON "milestone_progress"("courseProgressId", "milestoneId");

-- CreateIndex
CREATE UNIQUE INDEX "module_progress_courseProgressId_moduleId_key" ON "module_progress"("courseProgressId", "moduleId");

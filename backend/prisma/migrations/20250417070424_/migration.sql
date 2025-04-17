/*
  Warnings:

  - You are about to drop the `ModuelItemProgress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ModuelItemProgress" DROP CONSTRAINT "ModuelItemProgress_courseProgressId_fkey";

-- DropForeignKey
ALTER TABLE "ModuelItemProgress" DROP CONSTRAINT "ModuelItemProgress_moduleItemId_fkey";

-- DropForeignKey
ALTER TABLE "quiz_progress" DROP CONSTRAINT "quiz_progress_moduleItemProgressId_fkey";

-- DropForeignKey
ALTER TABLE "video_progress" DROP CONSTRAINT "video_progress_moduleItemProgressId_fkey";

-- DropTable
DROP TABLE "ModuelItemProgress";

-- CreateTable
CREATE TABLE "ModuleItemProgress" (
    "id" TEXT NOT NULL,
    "courseProgressId" TEXT NOT NULL,
    "moduleItemId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ModuleItemProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ModuleItemProgress_courseProgressId_moduleItemId_key" ON "ModuleItemProgress"("courseProgressId", "moduleItemId");

-- AddForeignKey
ALTER TABLE "ModuleItemProgress" ADD CONSTRAINT "ModuleItemProgress_courseProgressId_fkey" FOREIGN KEY ("courseProgressId") REFERENCES "course_progress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleItemProgress" ADD CONSTRAINT "ModuleItemProgress_moduleItemId_fkey" FOREIGN KEY ("moduleItemId") REFERENCES "ModuleItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_progress" ADD CONSTRAINT "video_progress_moduleItemProgressId_fkey" FOREIGN KEY ("moduleItemProgressId") REFERENCES "ModuleItemProgress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_progress" ADD CONSTRAINT "quiz_progress_moduleItemProgressId_fkey" FOREIGN KEY ("moduleItemProgressId") REFERENCES "ModuleItemProgress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

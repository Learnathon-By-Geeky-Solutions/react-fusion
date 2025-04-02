/*
  Warnings:

  - You are about to drop the column `completed` on the `video_progress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseProgressId,videoId]` on the table `video_progress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isCompleted` to the `video_progress` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "video_progress_courseProgressId_key";

-- AlterTable
ALTER TABLE "video_progress" DROP COLUMN "completed",
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "video_progress_courseProgressId_videoId_key" ON "video_progress"("courseProgressId", "videoId");

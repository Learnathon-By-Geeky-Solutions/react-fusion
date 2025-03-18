/*
  Warnings:

  - A unique constraint covering the columns `[userId,videoId]` on the table `Note` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Note_userId_videoId_key" ON "Note"("userId", "videoId");

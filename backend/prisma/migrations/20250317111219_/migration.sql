/*
  Warnings:

  - You are about to drop the column `milstoneId` on the `Module` table. All the data in the column will be lost.
  - Added the required column `milestoneId` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_milstoneId_fkey";

-- DropIndex
DROP INDEX "Milestone_courseId_key";

-- DropIndex
DROP INDEX "Module_milstoneId_key";

-- AlterTable
ALTER TABLE "Module" DROP COLUMN "milstoneId",
ADD COLUMN     "milestoneId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "Milestone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

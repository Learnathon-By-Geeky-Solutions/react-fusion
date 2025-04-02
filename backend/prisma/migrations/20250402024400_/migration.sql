/*
  Warnings:

  - You are about to drop the column `completed` on the `milestone_progress` table. All the data in the column will be lost.
  - You are about to drop the column `completed` on the `module_progress` table. All the data in the column will be lost.
  - Added the required column `isCompleted` to the `milestone_progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isCompleted` to the `module_progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "milestone_progress" DROP COLUMN "completed",
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "module_progress" DROP COLUMN "completed",
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL;

/*
  Warnings:

  - You are about to drop the column `descriptions` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `descriptions` on the `Milestone` table. All the data in the column will be lost.
  - You are about to drop the column `descriptions` on the `Module` table. All the data in the column will be lost.
  - Added the required column `description` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Milestone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "descriptions",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Milestone" DROP COLUMN "descriptions",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Module" DROP COLUMN "descriptions",
ADD COLUMN     "description" TEXT NOT NULL;

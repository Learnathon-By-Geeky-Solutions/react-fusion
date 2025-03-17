/*
  Warnings:

  - Added the required column `rating` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptions` to the `Milestone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Milestone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptions` to the `Module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Milestone" ADD COLUMN     "descriptions" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "descriptions" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

/*
  Warnings:

  - Added the required column `order` to the `Milestone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Milestone" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "order" INTEGER NOT NULL;

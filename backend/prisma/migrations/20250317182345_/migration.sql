/*
  Warnings:

  - You are about to drop the `Trnsactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trnsactions" DROP CONSTRAINT "Trnsactions_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Trnsactions" DROP CONSTRAINT "Trnsactions_studentId_fkey";

-- DropTable
DROP TABLE "Trnsactions";

-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "txnId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

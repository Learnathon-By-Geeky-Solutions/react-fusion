-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_studentId_fkey";

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

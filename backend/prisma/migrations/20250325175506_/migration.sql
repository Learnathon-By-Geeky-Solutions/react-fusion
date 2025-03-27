/*
  Warnings:

  - A unique constraint covering the columns `[txnId]` on the table `Transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Transactions_txnId_key" ON "Transactions"("txnId");

/*
  Warnings:

  - A unique constraint covering the columns `[cashfreeOrderId]` on the table `CustomerOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CustomerOrder" ADD COLUMN     "cashfreeOrderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CustomerOrder_cashfreeOrderId_key" ON "CustomerOrder"("cashfreeOrderId");

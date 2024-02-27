/*
  Warnings:

  - A unique constraint covering the columns `[checkout_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "orders_offer_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "orders_checkout_id_key" ON "orders"("checkout_id");

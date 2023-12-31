/*
  Warnings:

  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amount_payed` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `buyer_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `order_date` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[offer_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `offer_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - The required column `order_id` was added to the `orders` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_buyer_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_item_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey",
DROP COLUMN "amount_payed",
DROP COLUMN "buyer_id",
DROP COLUMN "item_id",
DROP COLUMN "order_date",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_payed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "offer_id" INTEGER NOT NULL,
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_offer_id_key" ON "orders"("offer_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "items_offers"("offer_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

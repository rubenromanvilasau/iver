/*
  Warnings:

  - You are about to drop the column `offer_date` on the `items_offers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "items_offers" DROP COLUMN "offer_date",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

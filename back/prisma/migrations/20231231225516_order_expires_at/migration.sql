/*
  Warnings:

  - Added the required column `expires_at` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "expires_at" TIMESTAMP(6) NOT NULL;

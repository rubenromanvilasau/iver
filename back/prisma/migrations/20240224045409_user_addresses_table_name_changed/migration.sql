/*
  Warnings:

  - You are about to drop the `UserAddress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_user_id_fkey";

-- DropTable
DROP TABLE "UserAddress";

-- CreateTable
CREATE TABLE "users_addresses" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "comuna" TEXT NOT NULL,
    "aditional_instructions" TEXT NOT NULL,

    CONSTRAINT "users_addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_addresses" ADD CONSTRAINT "users_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("rut") ON DELETE RESTRICT ON UPDATE CASCADE;

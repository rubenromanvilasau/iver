-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "checkout_id" VARCHAR;

-- AlterTable
ALTER TABLE "users_addresses" ALTER COLUMN "aditional_instructions" DROP NOT NULL;

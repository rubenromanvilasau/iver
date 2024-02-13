-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_banned" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "users_strikes" (
    "user_id" TEXT NOT NULL,
    "offer_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "users_strikes_pkey" PRIMARY KEY ("user_id","offer_id")
);

-- CreateTable
CREATE TABLE "users_preferences" (
    "user_id" TEXT NOT NULL,
    "accepts_crypto_payments" BOOLEAN NOT NULL DEFAULT false,
    "email_notifications" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_preferences_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "users_strikes" ADD CONSTRAINT "users_strikes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("rut") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_strikes" ADD CONSTRAINT "users_strikes_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "items_offers"("offer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_preferences" ADD CONSTRAINT "users_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("rut") ON DELETE RESTRICT ON UPDATE CASCADE;

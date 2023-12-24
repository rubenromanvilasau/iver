-- CreateTable
CREATE TABLE "categories" (
    "category_id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "items" (
    "item_id" SERIAL NOT NULL,
    "seller_id" VARCHAR NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR NOT NULL,
    "price" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "shipping_way_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "ends_at" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "items_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "items_images" (
    "item_image_id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "image_url" VARCHAR NOT NULL,
    "uploaded_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "items_images_pkey" PRIMARY KEY ("item_image_id")
);

-- CreateTable
CREATE TABLE "items_offers" (
    "offer_id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "user_id" VARCHAR NOT NULL,
    "amount" INTEGER NOT NULL,
    "offer_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "items_offers_pkey" PRIMARY KEY ("offer_id")
);

-- CreateTable
CREATE TABLE "items_statuses" (
    "status_id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "items_statuses_pkey" PRIMARY KEY ("status_id")
);

-- CreateTable
CREATE TABLE "order_statuses" (
    "status_id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "order_statuses_pkey" PRIMARY KEY ("status_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "item_id" INTEGER NOT NULL,
    "buyer_id" VARCHAR NOT NULL,
    "amount_payed" INTEGER NOT NULL,
    "order_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "shipping_ways" (
    "shipping_way_id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "shipping_ways_pkey" PRIMARY KEY ("shipping_way_id")
);

-- CreateTable
CREATE TABLE "users" (
    "rut" VARCHAR NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "password" VARCHAR NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "token" VARCHAR,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),
    "last_login" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("rut")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("rut") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_shipping_way_id_fkey" FOREIGN KEY ("shipping_way_id") REFERENCES "shipping_ways"("shipping_way_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "items_statuses"("status_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items_images" ADD CONSTRAINT "items_images_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("item_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items_offers" ADD CONSTRAINT "items_offers_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("item_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items_offers" ADD CONSTRAINT "items_offers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("rut") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "users"("rut") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("item_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

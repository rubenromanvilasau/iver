create table if not exists users (
	rut varchar primary key,
	name varchar(50) not null,
	last_name varchar(50) not null,
	username varchar(20) not null,
	password varchar not null,
	email varchar(250) unique not null,
	phone varchar(15) not null,
	token varchar null,
	created_on timestamp not null default now(),
	last_login timestamp
);

create table if not exists categories (
	category_id serial primary key,
	name varchar not null
);

create table if not exists statuses (
	status_id serial primary key,
	name varchar not null
);

create table if not exists shipping_ways (
	shipping_way_id serial primary key,
	name varchar not null
);

create table if not exists items (
	item_id serial primary key,
	seller_id varchar not null,
	name varchar(50) not null,
	description varchar not null,
	price int not null,
	status_id int not null,
	shipping_way_id int not null,
	category_id int not null,
	ends_at timestamp not null,
	created_at timestamp not null default now(),
	deleted_at timestamp default null,
	foreign key (seller_id)
		references users(rut),
	foreign key (status_id)
		references statuses(status_id),	
	foreign key (shipping_way_id)
		references shipping_ways(shipping_way_id)
);

create table if not exists orders (
	item_id int primary key,
	buyer_id varchar not null,
	amount_payed int not null,
	order_date timestamp not null default now(),
	foreign key (item_id)
		references items(item_id),
	foreign key (buyer_id)
		references users(rut)
);

create table if not exists items_offers (
	offer_id serial primary key,
	item_id int not null,
	user_id varchar not null,
	amount integer not null,
	offer_date timestamp not null default now(),
	foreign key (item_id)
		references items(item_id),
	foreign key (user_id)
		references users(rut)
);

create table if not exists items_images (
	item_image_id serial primary key,
	item_id int not null,
	image_url varchar not null,
	uploaded_date timestamp not null default now(),
	foreign key (item_id)
		references items(item_id)
);
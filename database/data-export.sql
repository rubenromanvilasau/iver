INSERT INTO public.users (rut,"name",last_name,username,"password",email,phone,"token",created_on,last_login) VALUES
	 ('20594941-0','Rubén','Román','ruben','$2b$10$nPWuHBKIM9k9rZnMhqVQM.yD9bjqYhsjDQE9zrcJdZxmfUG9/NHIO','r.roman.v8@gmail.com','+56989209062',NULL,'2023-11-20 17:17:10.889376',NULL),
	 ('20594941-1','Ruben','undefined','rubencito','$2b$10$tCz8nn.qS9Vu/.h0jjMazuuEcWmKilRaykubRIKIxBS29IfLReS96','rubenromanvilasau@outlook.com','undefined',NULL,'2023-11-20 19:06:44.901462',NULL);

INSERT INTO public.statuses ("name") VALUES
    ('New'),
    ('Used ike new'),
    ('Used');

INSERT INTO public.shipping_ways ("name") VALUES
	 ('Chilexpress'),
	 ('Pickup'),
	 ('Starken');

INSERT INTO public.items (seller_id,"name",description,price,status_id,shipping_way_id,category_id,published_date) VALUES
	 ('20594941-0','Toy','asd',15000,1,1,1,'2023-11-20 19:17:57.178834'),
	 ('20594941-0','PS1 ','Ps1 en buen estado, desbloqueada',45000,1,1,1,'2023-11-20 19:18:53.868214');

INSERT INTO public.categories ("name") VALUES
	 ('Tech'),
	 ('Toys'),
	 ('Clothing');
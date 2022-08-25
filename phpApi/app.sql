create table items (
	id int primary key auto_increment,
	name text not null,
	price decimal not null,
	count int not null,
	image text not null,
	image_slide text not null,
	add_time timestamp default now(),
	update_time timestamp default now()
);

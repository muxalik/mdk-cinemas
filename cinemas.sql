USE cinemas;

CREATE TABLE cinemas (
	id BIGINT PRIMARY KEY IDENTITY(1, 1),
	name VARCHAR(50) NOT NULL,
	district VARCHAR(50) NOT NULL,
	category VARCHAR(50) NOT NULL,
	capacity INT CHECK(capacity > 0),
	is_opened BIT,
);

CREATE TABLE actors (
	id BIGINT PRIMARY KEY IDENTITY(1, 1),
	name VARCHAR(100) NOT NULL,
);

CREATE TABLE movies (
	id BIGINT PRIMARY KEY IDENTITY(1, 1),
	name VARCHAR(100) NOT NULL,
	producer VARCHAR(100),
	operator VARCHAR(100),
	genre VARCHAR(100),
	production VARCHAR(100),
	awards VARCHAR, 
	duration INT CHECK(duration > 0),
	advert_screenshot VARCHAR(100),
	is_available BIT, 
	price INT CHECK(price > 0),
);

CREATE TABLE actor_movie (
	actor_id BIGINT NOT NULL,
	movie_id BIGINT NOT NULL,
	is_main_role BIT, 
	FOREIGN KEY (actor_id) REFERENCES actors(id),
	FOREIGN KEY (movie_id) REFERENCES movies(id),
	INDEX actor_movie_ndx (actor_id, movie_id),
);


CREATE TABLE sessions (
	id BIGINT PRIMARY KEY IDENTITY(1, 1),
	cinema_id BIGINT NOT NULL,
	movie_id BIGINT NOT NULL,
	ticket_price INT CHECK(ticket_price > 0),
	free_places INT CHECK(free_places > 0),
	starts_at DATETIME,
	FOREIGN KEY (cinema_id) REFERENCES cinemas (id),
	FOREIGN KEY (movie_id) REFERENCES movies (id),
);
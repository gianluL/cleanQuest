CREATE TABLE "user"(
	id SERIAL PRIMARY KEY,
	name VARCHAR(100),
	surname VARCHAR(100),
	email VARCHAR(255) UNIQUE,
	password TEXT,
	point INT DEFAULT 0
);

CREATE TABLE event (
	id serial PRIMARY KEY,
	title varchar(255),
	"date" date,
	description text,
	lat FLOAT NOT NULL,
  lng FLOAT NOT NULL,
	participantPoint int,
	img text,
	"user" int REFERENCES "user"("id")
);

CREATE TABLE user_event (
	"user" int REFERENCES "user"("id"),
	event int REFERENCES event(id),
	CONSTRAINT user_event_pk PRIMARY KEY("user", event)
);

CREATE TABLE item (
	id serial PRIMARY KEY,
	name varchar(100),
	description text,
  lat FLOAT NOT NULL,
	lng FLOAT NOT NULL,
	point int,
	isCollected TEXT DEFAULT NULL,
	img text,
	reporter int REFERENCES "user"(id),
	collector int REFERENCES "user"(id)
);


INSERT INTO "user" ("name", surname, email, "password", point)
VALUES
    ('Chris Adams', 'Adams', 'chrisadams@example.com', 'hashed_password', 85),
    ('Rachel Green', 'Green', 'rachelgreen@example.com', 'hashed_password', 90),
    ('Tom Harris', 'Harris', 'tomharris@example.com', 'hashed_password', 110),
    ('Sarah Taylor', 'Taylor', 'sarahtaylor@example.com', 'hashed_password', 130),
    ('Liam Williams', 'Williams', 'liamwilliams@example.com', 'hashed_password', 70),
    ('Olivia Martinez', 'Martinez', 'oliviamartinez@example.com', 'hashed_password', 95),
    ('James Wilson', 'Wilson', 'jameswilson@example.com', 'hashed_password', 160),
    ('Sophia Davis', 'Davis', 'sophiadavis@example.com', 'hashed_password', 80),
    ('Benjamin Moore', 'Moore', 'benjaminmoore@example.com', 'hashed_password', 40),
    ('Mia Scott', 'Scott', 'miascott@example.com', 'hashed_password', 65),
    ('Alexander Clark', 'Clark', 'alexanderclark@example.com', 'hashed_password', 150),
    ('Ella Walker', 'Walker', 'ellawalker@example.com', 'hashed_password', 135),
    ('Jackson Allen', 'Allen', 'jacksonallen@example.com', 'hashed_password', 100),
    ('Amelia Young', 'Young', 'ameliayoung@example.com', 'hashed_password', 125),
    ('Ethan King', 'King', 'ethanking@example.com', 'hashed_password', 55);
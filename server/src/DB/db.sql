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
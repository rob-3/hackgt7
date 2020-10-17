CREATE TABLE IF NOT EXISTS user (
  	username text,
  	id uuid,
  	password text,
  	PRIMARY KEY ((username), id)
) WITH CLUSTERING ORDER BY (id desc);
CREATE TABLE IF NOT EXISTS fraudulent (
  	latitude float,
  	id uuid,
  	longitude float,
    name text,
    count int,
    type text,
  	PRIMARY KEY (id)
) WITH CLUSTERING ORDER BY (id desc);
DROP DATABASE IF EXISTS cat_db;
CREATE DATABASE cat_db;
USE cat_db;

CREATE TABLE cats
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	sleepy BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);

INSERT INTO cats (name) VALUES ('Meeses');
INSERT INTO cats (name) VALUES ('Bobbi');
INSERT INTO cats (name, sleepy) VALUES ('Sylvester', true);
INSERT INTO cats (name, sleepy) VALUES ('Marilyn Manson', true);
INSERT INTO cats (name, sleepy) VALUES ('Joe Biden', true);
INSERT INTO cats (name) VALUES ('Owens');

-- TEST DATA BELOW, DON'T USE (USE cat_db above)

create database test_data;
use test_data;
create table temp_data
(
  id INT NOT NULL AUTO_INCREMENT,
  state VARCHAR(25) NOT NULL,
  country VARCHAR(25) NOT NULL,
  varX INTEGER,
  varY INTEGER,
  varB INTEGER,
  PRIMARY KEY(id)
);

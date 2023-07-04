CREATE DATABASE mvp_db;

CREATE TABLE user_prop_managers(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    image_url VARCHAR(255),
    created int,
    last_modified int
)

CREATE TABLE listed_properties(
    property_id SERIAL PRIMARY KEY,
    address VARCHAR(255),
    number_of_bedrooms int,
    number_of_bathrooms int,
    image_url VARCHAR(255),
    description VARCHAR(255),
    created int,
    last_modified int
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	email VARCHAR(255),
    firebase_uid VARCHAR(255),
	created timestamp default current_timestamp
);

ALTER TABLE listed_properties
    ADD COLUMN pm_firebase_uid VARCHAR(255);

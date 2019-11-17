DROP DATABASE IF EXISTS marine_biology_db;
CREATE DATABASE marine_biology_db;

\c marine_biology_db;

CREATE TABLE researchers (
    id SERIAL PRIMARY KEY,
    name VARCHAR ,
    job_title VARCHAR
);

CREATE TABLE species (
    id SERIAL PRIMARY KEY, 
    name VARCHAR,
    is_mammal BOOLEAN DEFAULT FALSE
);

CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    species_id  INT REFERENCES species (id), 
    nickname VARCHAR
);

CREATE TABLE habitats (
    id SERIAL PRIMARY KEY,
    category VARCHAR
);

CREATE TABLE sightings (
    id SERIAL PRIMARY KEY,
    researcher_id INT  REFERENCES researchers (id) ON DELETE SET NULL,
    species_id INT REFERENCES species (id) ON DELETE CASCADE,
    habitat_id INT REFERENCES habitat (id) 
);
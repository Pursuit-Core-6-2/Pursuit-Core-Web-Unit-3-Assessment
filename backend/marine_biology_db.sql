DROP DATABASE IF EXISTS marine_biology_db;

CREATE DATABASE marine_biology_db;

\c marine_biology_db;

CREATE TABLE researchers(
    id SERIAL PRIMARY KEY,
    full_name VARCHAR,
    job_title VARCHAR
);

CREATE TABLE species(
    id SERIAL PRIMARY KEY,
    species_name VARCHAR,
    is_mammal BOOLEAN
);

CREATE TABLE animals(
    id SERIAL PRIMARY KEY,
    species_id INT REFERENCES species (id),
    nickname VARCHAR
);

CREATE TABLE habitats(
    id SERIAL PRIMARY KEY,
    category VARCHAR
);

CREATE TABLE sightings(
    id SERIAL PRIMARY KEY, 
    reseacher_id INT REFERENCES researchers (id) ON DELETE SET NULL,
    species_id INT REFERENCES species (id) ON DELETE CASCADE,
    habitat_id INT REFERENCES habitats (id)
);


INSERT INTO researchers(full_name, job_title)
    VALUES('Mariana Aleta', 'Project Lead'),
          ('Javed Patrick', 'Senior Field Researcher'),
          ('Carolina Itai', 'Field Researcher'),
          ('Jazmyn Gottfried', 'Field Researcher'),
          ('Ezra Flip', 'Research Intern');

INSERT INTO species (species_name, is_mammal)
    VALUES('Dolphin', FALSE),
          ('Moray Eel', FALSE),
          ('Tiger Shark', FALSE),
          ('Orca Whale', TRUE),
          ('Moon Jelly', FALSE);

INSERT INTO animals (species_id, nickname)
    VALUES(1, 'Flip'),
          (1, 'Skip'),
          (2, 'Jenkins'),
          (3, 'Sally'),
          (5, 'Flapjack'),
          (5, 'Gibbous'),
          (5, 'Nox');

INSERT INTO habitats (category)
    VALUES('Shallows'),
          ('Coral Reef'),
          ('Tide Pools'),
          ('Deeps');

INSERT INTO sightings(reseacher_id, species_id, habitat_id)
    VALUES(4, 4, 4),
          (1, 3, 4),
          (5, 3, 3),
          (2, 5, 2),
          (1, 2, 1),
          (2, 5, 1);

SELECT * FROM sightings;



    

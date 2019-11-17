DROP DATABASE IF EXISTS marine_biology_research;

CREATE DATABASE marine_biology_research;

\c marine_biology_research


-- UNDERSTAND THE QUESTION IS REQUIRING THE DELETE (ON DELETE CASCADE) BUT I'M DOING A SOFT DELETE
CREATE TABLE researchers (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    job_title VARCHAR NOT NULL,
    available BOOLEAN DEFAULT TRUE
);
-- DIDN'T DO UNIQUE FOR NAMES ASSUMENT TWO PERSONS CAN HAVE THE SAME NAME

CREATE TABLE species (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    is_mammal BOOLEAN NOT NULL,
    available BOOLEAN DEFAULT TRUE
);

CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    species_id INT REFERENCES species (id) ON UPDATE CASCADE,
    nickname VARCHAR,
    available BOOLEAN DEFAULT TRUE
);

CREATE TABLE habitats (
    id SERIAL PRIMARY KEY,
    category VARCHAR UNIQUE NOT NULL,
    available BOOLEAN DEFAULT TRUE
);

CREATE TABLE sightings (
    id SERIAL PRIMARY KEY,
    researcher_id INT REFERENCES researchers (id) ON UPDATE CASCADE,
    species_id INT REFERENCES species (id) ON UPDATE CASCADE,
    habitat_id INT REFERENCES habitats (id) ON UPDATE CASCADE,
    available BOOLEAN DEFAULT TRUE
);


-- SEEDING DATABASE
INSERT INTO researchers (name, job_title)
    VALUES ('Mariana Aleta', 'Project Lead'),
            ('Javed Patrick', 'Senior Field Researcher'),
            ('Carolina Itai', 'Field Researcher'),
            ('Jazmyn Gottfried', 'Field Researcher'),
            ('Ezra Flip', 'Research Intern');

INSERT INTO species (name, is_mammal)
    VALUES ('Dolphin', TRUE),
            ('Moray Eel', FALSE),
            ('Tiger Shark', FALSE),
            ('Orca Whale', TRUE),
            ('Moon Jelly', FALSE);


INSERT INTO animals (species_id, nickname)
    VALUES (1, 'Flip'),
            (1, 'Skip'),
            (2, 'Jenkins'),
            (3, 'Sally'),
            (5, 'Flapjack'),
            (5, 'Gibbous'),
            (5, 'Nox');


INSERT INTO habitats (category)
    VALUES ('Shallows'),
            ('Coral Reef'),
            ('Tide Pools'),
            ('Deeps');


INSERT INTO sightings (researcher_id, species_id, habitat_id)
    VALUES (4, 4, 4),
            (1, 3, 4),
            (3, 5, 3),
            (5, 2, 2),
            (2, 1, 1),
            (5, 2, 1)



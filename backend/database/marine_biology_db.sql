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
    habitat_id INT REFERENCES habitats (id) 
);

INSERT INTO researchers (name, job_title)
    VALUES ('Javed Patrick', 'Senior Field Researcher'), 
            ('Carolina Itai', 'Field Researcher'),
             ('Jazmyn Gottfried', 'Field Researcher'), 
             ('Ezra Flip', 'Research Intern')


INSERT INTO species (name, is_mammal)
    VALUES ('Dolphin', 'true'),
            ('Mory Eel', 'false'),
            ('Tiger Shark', 'false')

-- INSERT INTO animals (species_id, nick_name) VALUES()


-- INSERT INTO sightings (researcher_id,species_id, habitat_id)
--     VALUES('3, ')



DROP DATABASE IF EXISTS marine_db;

CREATE DATABASE marine_db;

\c marine_db

CREATE TABLE researchers (
   res_id SERIAL PRIMARY KEY,
   name VARCHAR,
   job_title VARCHAR
);

CREATE TABLE species (
   spe_id SERIAL PRIMARY KEY,
   name VARCHAR,
   is_mammal VARCHAR NOT NULL,
   completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE animals (
   ani_id SERIAL PRIMARY KEY,
   species_id INT REFERENCES species (spe_id),
   nickname VARCHAR
);

CREATE TABLE habitat (
   hab_id SERIAL PRIMARY KEY,
   category VARCHAR
);

CREATE TABLE sightings (
   sig_id SERIAL PRIMARY KEY,
   researcher_id INT REFERENCES researchers (res_id) ON DELETE SET NULL,
   species_id INT  REFERENCES species (spe_id) ON DELETE CASCADE,
   habitat_id INT REFERENCES habitat (hab_id)
);

INSERT INTO researchers(name, job_title) 
   VALUES   ('Mariana Aleta', 'Project Lead'),
            ('Javed', 'Senior Field Researcher'),
            ('Carolina', 'Field Researcher'),
            ('Jazmyn', 'Field Researcher'),
            ('Ezra', 'Research Intern');

INSERT INTO species(name, is_mammal) 
   VALUES   ('Dolphin', true),
            ('Moray Eel', false),
            ('Tiger Shark', false),
            ('Orca Whale', true),
            ('Moon Jelly', false);


INSERT INTO animals(species_id, nickname) 
   VALUES   (1, 'Flip'),    -- Dolphin
            (1, 'Skip'),    -- Dolphin
            (2, 'Jenkins'), -- Moray El
            (3, 'Sally'),   -- Tiger Shark
            (5, 'Flapjack'),-- Moon Jelly
            (5, 'Gibbous'), -- Moon Jelly
            (5, 'Nox');     -- Moon Jelly


INSERT INTO habitat (category) 
   VALUES   ('Shallows'),
            ('Coral Reef'),
            ('Tide Pools'),
            ('Deeps');


INSERT INTO sightings(species_id, researcher_id, habitat_id) 
VALUES   (4, 4, 4), -- An Orca Whale was spotted by Jazmyn Gottfried in the Deeps.
         (3, 1, 4), -- A Tiger Shark was spotted by Mariana Aleta in the Deeps.
         (5, 3, 3), -- A Moon Jelly was spotted by Carolina Itai in the Tide Pools.
         (2, 5, 2), -- A Moray Eel was spotted by Ezra Flip in the Coral Reef.
         (1, 2, 1), -- A Dolphin was spotted by Javed Patrick in the Shallows.
         (2, 5, 1);  -- A Moray Eel was spotted by Ezra Flip in the Shallows.

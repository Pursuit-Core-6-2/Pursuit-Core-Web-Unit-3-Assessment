DROP DATABASE IF EXISTS seed;
CREATE DATABASE seed;

\c seed;

CREATE TABLE researchers (
    id SERIAL PRIMARY KEY,
    researchers_name VARCHAR,
    job_title VARCHAR
);

CREATE TABLE species (
    id SERIAL PRIMARY KEY,
    species_name VARCHAR,
    is_mammal BOOLEAN
);

CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    species_id INT REFERENCES species (id),
    nickname VARCHAR
);

CREATE TABLE habitats (
    id SERIAL PRIMARY KEY,
    catergory VARCHAR
);

CREATE TABLE sightings (
    id SERIAL PRIMARY KEY,
    researcher_id INT REFERENCES researchers (id) ON DELETE SET NULL,
    species_id INT REFERENCES species (id),
    habitat_id INT REFERENCES habitats
);

INSERT INTO researchers(researchers_name, job_title) VALUES 
('Mariana Aleta', 'Project Lead'),
('Javed', 'Senior Field Researcher'),
('Carolina', 'Field Researcher'),
('Jazmyn', 'Field Researcher'),
('Ezra', 'Research Intern')
;

INSERT INTO species(species_name, is_mammal) VALUES
('Dolphin', true),
('Moral Eel', false),
('Tiger Shark', false),
('Orca Whale', true),
('Moon Jelly', false)
;

INSERT INTO animals(species_id, nickname) VALUES
(1, 'Flip'),
(1, 'Skip'),
(2, 'Jenkins'),
(3, 'Sally'),
(5, 'Flapjack'),
(5, 'Gibbous'),
(5, 'Nox')
;
-- FROM TOP TO BOTTOM OF ANIMALS INPUTS
 -- Dolphin
 -- Dolphin
 -- Moray El
 -- Tiger Shark
 -- Moon Jelly
 -- Moon Jelly
 -- Moon Jelly

INSERT INTO habitats(catergory) VALUES
('Shallows'),
('Coral Reef'),
('Tide Pools'),
('Deeps')
;

INSERT INTO sightings(species_id, researcher_id, habitat_id) VALUES
(4, 4, 4),
(3, 1, 4),
(5, 3, 3),
(2, 5, 2),
(1, 2, 1),
(2, 5, 1)
;
-- FROM TOP TO BOTTOM OF SIGHTINGS INPUTS

 -- An Orca Whale was spotted by Jazmyn Gottfried in the Deeps.

 -- A Tiger Shark was spotted by Mariana Aleta in the Deeps.

 -- A Moon Jelly was spotted by Carolina Itai in the Tide Pools.

 -- A Moray Eel was spotted by Ezra Flip in the Coral Reef.

 -- A Dolphin was spotted by Javed Patrick in the Shallows.

 -- A Moray Eel was spotted by Ezra Flip in the Shallows.
DROP DATABASE IF EXISTS marine_bio;

CREATE DATABASE marine_bio;

\c marine_bio

-- droping tables at start to avoid bugs
DROP TABLE IF EXISTS researchers;

DROP TABLE IF EXISTS species;

DROP TABLE IF EXISTS animals;

DROP TABLE IF EXISTS habitats;

DROP TABLE IF EXISTS sightings;

CREATE TABLE Researchers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    job_title VARCHAR
);

CREATE TABLE Species (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    is_mammal BOOLEAN
);

CREATE TABLE Animals (
    id SERIAL PRIMARY KEY,
    species_id INT REFERENCES Species(id) NOT NULL,
    nickname VARCHAR(255)
);

CREATE TABLE Habitats (
    id SERIAL PRIMARY KEY,
    category VARCHAR(255) NOT NULL
);

CREATE TABLE Sightings (
    id SERIAL PRIMARY KEY,
    researcher_id INT REFERENCES Researchers(id) ON DELETE SET NULL,
    species_id INT REFERENCES Species(id) ON DELETE CASCADE,
    habitats_id INT REFERENCES Habitats(id)
);

-- Adding info

INSERT INTO Researchers(name, job_title)
    VALUES('Mariana Aleta', 'Project Lead'),
        ('Javed Patrick', 'Senior Field Researcher'),
        ('Carolina Itai', 'Field Researcher'),
        ('Jazmyn Gottfried', 'Field Researcher'),
        ('Ezra Flip', 'Research Intern');

INSERT INTO Species(name, is_mammal)
    VALUES('Dolphin', TRUE),
        ('Moray Eel', FALSE),
        ('Tiger Shark', FALSE),
        ('Orca Whale', TRUE),
        ('Moon Jelly', FALSE);

INSERT INTO Animals(species_id, nickname)
    VALUES(1, 'Flip'),
        (1, 'Skip'),
        (2, 'Jinkens'),
        (3, 'Sally'),
        (4, 'Forgotten'),
        (5, 'Flapjack'),
        (5, 'Gibbous'),
        (5, 'Nox');

INSERT INTO Habitats(category)
    VALUES('Shallow'),
        ('Coral Reef'),
        ('Tide Pools'),
        ('Deeps');

INSERT INTO Sightings(researcher_id, species_id, habitats_id)
    VALUES(4, 4, 4), --An Orca Whale was spotted by Jazmyn Gottfried in the Deeps.
        (1, 3, 4), --A Tiger Shark was spotted by Mariana Aleta in the Deeps.
        (3, 5, 3), --A Moon Jelly was spotted by Carolina Itai in the Tide Pools.
        (5, 2, 2), --A Moray Eel was spotted by Ezra Flip in the Coral Reef.
        (2, 1, 1),--A Dolphin was spotted by Javed Patrick in the Shallows.
        (5, 2, 1); --A Moray Eel was spotted by Ezra Flip in the Shallows.

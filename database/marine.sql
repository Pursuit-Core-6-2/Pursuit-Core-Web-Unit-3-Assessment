DROP DATABASE IF EXISTS marine;

CREATE DATABASE marine;

\c marine

-- CREATING TABLES 
CREATE TABLE researchers (
    r_id SERIAL PRIMARY KEY,
    r_name VARCHAR(150) NOT NULL,
    r_job_title VARCHAR(100) NOT NULL
);

CREATE TABLE species (
    sp_id SERIAL PRIMARY KEY,
    sp_name VARCHAR(150) NOT NULL,
    sp_is_mammal BOOLEAN NOT NULL
);

CREATE TABLE animals (
    a_id SERIAL PRIMARY KEY,
    a_species_id INT REFERENCES species(sp_id),
    a_nickname VARCHAR(150) NOT NULL
);

CREATE TABLE habitats (
    h_id SERIAL PRIMARY KEY,
    h_category VARCHAR(150) NOT NULL
);

CREATE TABLE sightings (
    si_id SERIAL PRIMARY KEY,
    si_species_id INT REFERENCES species (sp_id) ON DELETE CASCADE,
    si_researcher_id INT REFERENCES researchers (r_id) ON DELETE SET NULL,
    si_habitat_id INT REFERENCES habitats (h_id)
);

-- INSERTING DATA
INSERT INTO researchers(r_name, r_job_title) VALUES
('Mariana Aleta', 'Project Lead'),
('Javed', 'Senior Field Researcher'),
('Carolina', 'Field Researcher'),
('Jazmyn', 'Field Researcher'),
('Ezra', 'Research Intern')
;

INSERT INTO species(sp_name, sp_is_mammal) VALUES
('Dolphin', true),
('Moray Eel', false),
('Tiger Shark', false),
('Orca Whale', true),
('Moon Jelly', false)
;

INSERT INTO animals(a_species_id, a_nickname) VALUES
(1, 'Flip'),    -- Dolphin
(1, 'Skip'),    -- Dolphin
(2, 'Jenkins'), -- Moray El
(3, 'Sally'),   -- Tiger Shark
(5, 'Flapjack'),-- Moon Jelly
(5, 'Gibbous'), -- Moon Jelly
(5, 'Nox')      -- Moon Jelly
;

INSERT INTO habitats(h_category) VALUES
('Shallows'),
('Coral Reef'),
('Tide Pools'),
('Deeps')
;

INSERT INTO sightings(si_species_id, si_researcher_id, si_habitat_id) VALUES
(4, 4, 4), -- An Orca Whale was spotted by Jazmyn Gottfried in the Deeps.
(3, 1, 4), -- A Tiger Shark was spotted by Mariana Aleta in the Deeps.
(5, 3, 3), -- A Moon Jelly was spotted by Carolina Itai in the Tide Pools.
(2, 5, 2), -- A Moray Eel was spotted by Ezra Flip in the Coral Reef.
(1, 2, 1), -- A Dolphin was spotted by Javed Patrick in the Shallows.
(2, 5, 1)  -- A Moray Eel was spotted by Ezra Flip in the Shallows.
;
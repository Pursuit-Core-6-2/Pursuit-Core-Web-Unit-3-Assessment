const app = require('../app');
const request = require('supertest');
const resetDB = require('./resetDB');
const utils = require('./utils');

beforeAll(async () => {
  try {
    await resetDB();
  } catch (err) {
    throw err
  }
})

describe('Sightings functionality and routes', () => {

  it('[GET][/sightings][200] - Should retrieve all sightings including the species, researcher and habitat names. Return status 200', (done) => {
    expect.assertions(6)

    request(app)
      .get('/sightings')
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toBeArrayOfSize(6);
        expect(data.payload[0]).toContainKeys([
          "researcher_id",
          "researcher_name",
          "species_id",
          "species_name",
          "habitat_id",
          "habitat_category",
        ]);
        done()
      })
  })

  it('[GET][/sightings/species/:id][200] - Should retrieve all sightings by species with id = :id. Return status 200', (done) => {
    expect.assertions(6)

    request(app)
      .get('/sightings/species/2')
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toBeArrayOfSize(2); // Initial DB seed data has 2 sightings for species id 2
        expect(data.payload[0]).toContainKeys([
          "researcher_id",
          "researcher_name",
          "species_id",
          "species_name",
          "habitat_id",
          "habitat_category",
        ]);
        done()
      })
  })

  it('[GET][/sightings/habitats/:id][200] - Should retrieve all sightings by habitats with id = :id. Return status 200', (done) => {
    expect.assertions(6)

    request(app)
      .get('/sightings/habitats/4')
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toBeArrayOfSize(2); // Initial DB seed data has 2 sightings for habitat id 4 "Deeps"
        expect(data.payload[0]).toContainKeys([
          "researcher_id",
          "researcher_name",
          "species_id",
          "species_name",
          "habitat_id",
          "habitat_category",
        ]);
        done()
      })
  })

  it('[GET][/sightings/researchers/:id][200] - Should retrieve all sightings by researchers with id = :id. Return status 200', (done) => {
    expect.assertions(6)

    request(app)
      .get('/sightings/researchers/3')
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toBeArrayOfSize(1); // Initial DB seed data has 1 sightings for researcher id 3 "Carolina"
        expect(data.payload[0]).toContainKeys([
          "researcher_id",
          "researcher_name",
          "species_id",
          "species_name",
          "habitat_id",
          "habitat_category",
        ]);
        done()
      })
  })
})

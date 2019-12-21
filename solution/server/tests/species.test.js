const app = require('../app');
const request = require('supertest');
const utils = require('./utils');
const resetDB = require('./resetDB');

beforeAll(async () => {
  try {
    await resetDB();
  } catch (err) {
    throw err
  }
})

describe('Species functionality and routes', () => {
  it('[GET][/species][200] - Should retrieve all species and return status 200', (done) => {
    expect.assertions(5)

    request(app)
      .get('/species')
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toBeArrayOfSize(5);
        done()
      })
  })


  it('[GET][/species/:id][200] - Should retrieve researcher with id `:id` and return status 200', (done) => {
    expect.assertions(5)

    request(app)
      .get('/species/2')
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toEqual({
          id: 2,
          name: "Moray Eel",
          is_mammal: false
        });

        done()
      })
  })

  it('[POST][/species][201] - Should add a new species', (done) => {
    expect.assertions(5)

    const specie = {
      name: 'Bald Eagle',
      is_mammal: false
    }

    request(app)
      .post('/species')
      .send(specie)
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(201)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toEqual({
          id: 6,
          name: specie.name,
          is_mammal: specie.is_mammal
        });

        done()
      })
  })
})

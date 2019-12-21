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

describe('Habitats functionality and routes', () => {

  it('[GET][/habitats][200] - Should retrieve all the habitats return status 200', (done) => {
    expect.assertions(5)

    request(app)
      .get('/habitats')
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toBeArrayOfSize(4);
        done()
      })
  })

  it('[POST][/habitats/][201] - Should add a new habitat and return status 201', (done) => {
    expect.assertions(5)

    const newHabitat = {
      category: "Rain Forest",
    }

    request(app)
      .post('/habitats')
      .send(newHabitat)
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(201)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toContainEntry(["category", newHabitat.category]);
        done()
      })
  })

  it('[GET][/habitats/:id][200] - Should retrieve a habitats with id = :id. return status 200', (done) => {
    expect.assertions(5)

    request(app)
      .get('/habitats/1')
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toContainEntry(["category", "Shallows"]);
        done()
      })
  })
})

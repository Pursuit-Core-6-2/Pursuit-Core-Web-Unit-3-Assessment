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

describe('Animals functionality and routes', () => {
  it('[GET][/animals][200] - Should retrieve all animals and return status 200', (done) => {
    expect.assertions(5)

    request(app)
      .get('/animals')
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toBeArrayOfSize(7);
        done()
      })
  })

  it('[GET][/animals/:id][200] - Should retrieve an animal with id = :id and return status 200', (done) => {
    expect.assertions(5)

    request(app)
      .get('/animals/1')
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toEqual({
          id: 1,
          species_id: 1,
          nickname: "Flip"
        });
        done()
      })
  })

  it('[POST][/animals/][201] - Should add a new animal and return status 201', (done) => {
    expect.assertions(5)

    const newAnimal = {
      species_id: 1,
      nickname: "Popeye"
    }

    request(app)
      .post('/animals')
      .send(newAnimal)
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(201)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toEqual({
          id: 8,
          species_id: newAnimal.species_id,
          nickname: newAnimal.nickname
        });
        done()
      })
  })

  it('[PATCH][/animals/:id][200] - Should add update an animal and return status 200', async (done) => {
    expect.assertions(5)

    const newAnimal = {
      species_id: 1,
      nickname: "Popeye"
    }

    let addedAnimal;
    try {
      const res = await utils.addAnimal(newAnimal)
      addedAnimal = res.body.payload
    } catch (err) {
      throw err
    }

    const updatesForAnimal = {
      species_id: 2,
      nickname: "Pop"
    }

    request(app)
      .patch(`/animals/${addedAnimal.id}`)
      .send(updatesForAnimal)
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toEqual({
          id: addedAnimal.id,
          species_id: updatesForAnimal.species_id,
          nickname: updatesForAnimal.nickname
        });
        done()
      })
  })

  it('[DELETE][/animals/:id][200] - Should delete animal with id = :id and return status 200', async (done) => {
    expect.assertions(5)

    const newAnimal = {
      species_id: 1,
      nickname: "Popeye"
    }

    let addedAnimal;
    try {
      const res = await utils.addAnimal(newAnimal)
      addedAnimal = res.body.payload
    } catch (err) {
      throw err
    }

    request(app)
      .delete(`/animals/${addedAnimal.id}`)
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toEqual({
          id: addedAnimal.id,
          species_id: addedAnimal.species_id,
          nickname: addedAnimal.nickname
        });
        done()
      })
  })
})

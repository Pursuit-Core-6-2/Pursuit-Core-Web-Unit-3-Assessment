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

describe('Researchers functionality and routes', () => {
  it('[GET][/researchers][200] - Should retrieve all researchers and return status 200', (done) => {
    expect.assertions(5)

    request(app)
      .get('/researchers')
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toBeArray();
        done()
      })
  })


  it('[GET][/researchers/2][200] - Should retrieve researcher with id 2 and return status 200', (done) => {
    expect.assertions(5)

    request(app)
      .get('/researchers/2')
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toBeObject();

        done()
      })
  })

  it('[POST][/researchers][200] - Should add a new researcher', (done) => {
    expect.assertions(5)

    const researcher = {
      name: 'Jen',
      job_title: 'Zoo Technician'
    }

    request(app)
      .post('/researchers')
      .send(researcher)
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toBeObject();

        done()
      })
  })

  it('[PATCH][/researchers/:id][200] - Should update researcher with id :id', async (done) => {
    expect.assertions(6)

    const researcher = {
      name: 'Jen',
      job_title: 'Zoo Technician'
    }

    const updates = {
      name: 'Jenny',
      job_title: 'Zoo Veterinarian'
    }

    let res;
    try {
      res = await utils.addResearcher(researcher)
    } catch (err) {
      throw err
    }

    const newResearcher = res.body.payload;

    request(app)
      .patch(`/researchers/${newResearcher.id}`)
      .send(updates)
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toContainEntry(["name", updates.name])
        expect(data.payload).toContainEntry(["job_title", updates.job_title])

        done()
      })
  })

  it('[DELETE][/researchers/:id][200] - Should update researcher with id :id', async (done) => {
    expect.assertions(6)

    const researcher = {
      name: 'Jack',
      job_title: 'Bird Watcher'
    }

    let res;
    try {
      res = await utils.addResearcher(researcher)

    } catch (err) {
      throw err
    }

    const newResearcher = res.body.payload;

    request(app)
      .delete(`/researchers/${newResearcher.id}`)
      .end((err, res) => {
        if (err) throw err
        const statusCode = res.status
        const data = res.body

        expect(statusCode).toBe(200)
        expect(data).toContainAllKeys(['status', 'message', 'payload'])
        expect(data.status).toBe('success')
        expect(data.message).toBeString();
        expect(data.payload).toContainEntry(["name", newResearcher.name])
        expect(data.payload).toContainEntry(["job_title", newResearcher.job_title])

        done()
      })
  })


})

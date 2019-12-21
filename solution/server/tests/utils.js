const request = require('supertest')
const app = require('../app')

const addResearcher = async (researcher) => {
  try {
    let res = await request(app)
      .post('/researchers')
      .send(researcher)
    return res;
  } catch (err) {
    throw err
  }
}

const addAnimal = async (animal) => {
  try {
    let res = await request(app)
      .post('/animals')
      .send(animal)
    return res;
  } catch (err) {
    throw err
  }
}

module.exports = {
  addResearcher,
  addAnimal
}

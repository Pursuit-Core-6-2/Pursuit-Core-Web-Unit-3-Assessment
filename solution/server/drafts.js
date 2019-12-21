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


const getById = async (id) => {
  try {
    let specie = await db.any('SELECT * FROM species WHERE id = $1', id);
    return specie[0];
  } catch (err) {
    throw err
  }
}

const add = async (specie) => {
  const insertQuery = `
  INSERT INTO species(name, is_mammal) 
    VALUES($/name/, $/is_mammal/)
    RETURNING *
  `
  try {
    let newSpecie = await db.one(insertQuery, specie);
    return newSpecie;
  } catch (err) {
    throw err
  }
}

// Router
router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    let specie = await Species.getById(id)
    if (specie) {
      res.json({
        status: 'success',
        message: 'retrieved single species',
        payload: specie
      })
    } else {
      res.json({
        status: 'error',
        message: 'specie not found',
        payload: null
      })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({
      status: 'error',
      message: 'failed retrieving specie',
      payload: null
    })
  }
})

router.post('/', async (req, res, next) => {
  const specie = req.body;
  try {
    let newSpecie = await Species.add(specie)
    res.status(201).json({
      status: 'success',
      message: 'added new species',
      payload: newSpecie
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({
      status: 'error',
      message: 'failed adding species',
      payload: null
    })
  }
})

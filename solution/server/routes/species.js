const express = require('express');
const router = express.Router();
const Species = require('../db/Species');

router.get('/', async (req, res, next) => {
  try {
    let species = await Species.getAll()
    res.json({
      status: 'success',
      message: 'retrieved all species',
      payload: species
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      status: 'error',
      message: 'failed retrieving all species',
      payload: null
    })
  }
})

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
module.exports = router;

const express = require('express');
const router = express.Router();
const Animals = require('../db/animals');

router.get('/', async (req, res, next) => {
  try {
    let animals = await Animals.getAll()
    res.json({
      status: 'success',
      message: 'retrieved all animals',
      payload: animals
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      status: 'error',
      message: 'failed retrieving all animals',
      payload: null
    })
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    let animal = await Animals.getById(id)
    if (animal) {
      res.json({
        status: 'success',
        message: 'retrieved all animals',
        payload: animal
      })
    } else {
      res.status(404).json({
        status: 'error',
        message: 'animal not found',
        payload: null
      })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({
      status: 'error',
      message: 'failed retrieving animal by id',
      payload: null
    })
  }
})

router.post('/', async (req, res, next) => {
  const animal = req.body

  try {
    let newAnimal = await Animals.add(animal)
    res.status(201).json({
      status: 'success',
      message: 'add a new animals',
      payload: newAnimal
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      status: 'error',
      message: 'failed adding animal',
      payload: null
    })
  }
})

router.patch('/:id', async (req, res, next) => {
  const id = req.params.id
  const animalUpdates = req.body

  try {
    let updatedAnimal = await Animals.update(id, animalUpdates)
    res.status(200).json({
      status: 'success',
      message: 'updated animal',
      payload: updatedAnimal
    })
  } catch (err) {
    console.error(err)
    if (err.message === "No data returned from the query.") {
      res.status(404).json({
        status: 'error',
        message: 'animal to update not found',
        payload: null
      })

    } else {
      res.status(500).json({
        status: 'error',
        message: 'failed updating animal',
        payload: null
      })
    }
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    let deletedAnimal = await Animals.remove(id)
    res.status(200).json({
      status: 'success',
      message: 'deleted animal',
      payload: deletedAnimal
    })
  } catch (err) {
    console.error(err)
    if (err.message === "No data returned from the query.") {
      res.status(404).json({
        status: 'error',
        message: 'animal to delete not found',
        payload: null
      })

    } else {
      res.status(500).json({
        status: 'error',
        message: 'failed deleting animal',
        payload: null
      })
    }
  }
})

module.exports = router;

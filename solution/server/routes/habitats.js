const express = require('express');
const router = express.Router();
const Habitats = require('../db/Habitats');

router.get('/', async (req, res, next) => {
  try {
    const habitats = await Habitats.getAll()
    res.json({
      status: "success",
      message: "retrieved all habitats",
      payload: habitats
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      status: "error",
      message: "failed to retrieve all habitats",
      payload: null
    })
  }
})

router.get('/:id', async (req, res, next) => {
  let id = req.params.id;
  try {
    const habitat = await Habitats.getById(id)
    if (habitat) {
      res.json({
        status: "success",
        message: "retrieved habitat by",
        payload: habitat
      })
    } else {
      res.status(404).json({
        status: "success",
        message: "habitat not found",
        payload: null
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      status: "error",
      message: "failed to retrieve habitat by id",
      payload: null
    })
  }
})

router.post('/', async (req, res, next) => {
  let habitat = req.body
  try {
    const newHabitat = await Habitats.add(habitat)
    res.status(201).json({
      status: "success",
      message: "added a new habitat",
      payload: newHabitat
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      status: "error",
      message: "failed to add a new habitat",
      payload: null
    })
  }
})

module.exports = router;


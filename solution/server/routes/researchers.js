const express = require('express');
const router = express.Router();
const Researchers = require('../db/Researchers');

router.get('/', async (req, res, next) => {
  try {
    let researchers = await Researchers.getAll()
    res.json({
      status: 'success',
      message: 'retrieved all researchers',
      payload: researchers
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'failed retrieving all researchers',
      payload: null
    })
  }
})

router.post('/', async (req, res, next) => {
  let researcher = req.body;
  try {
    let newResearcher = await Researchers.add(researcher)
    res.json({
      status: 'success',
      message: 'added new researcher',
      payload: newResearcher
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      status: 'error',
      message: 'failed adding researcher',
      payload: null
    })
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let researcher = await Researchers.getById(req.params.id)
    if (researcher) {
      res.json({
        status: 'success',
        message: 'retrieved researcher',
        payload: researcher
      })
    } else {
      res.status(404).json({
        status: 'error',
        message: 'researcher not found',
        payload: null
      })
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieved researcher',
      payload: null
    })
  }
})

router.patch('/:id', async (req, res, next) => {
  const updates = req.body
  const researcherId = req.params.id
  try {
    let updatedResearcher = await Researchers.update(researcherId, updates)
    if (updatedResearcher) {
      res.json({
        status: 'success',
        message: 'updated researcher',
        payload: updatedResearcher
      })
    } else {
      res.status(404).json({
        status: 'error',
        message: 'researcher not found',
        payload: null
      })
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update researcher',
      payload: null
    })
  }
})

router.delete('/:id', async (req, res, next) => {
  const researcherId = req.params.id
  try {
    let removedResearcher = await Researchers.remove(researcherId)
    if (removedResearcher) {
      res.json({
        status: 'success',
        message: 'deleted researcher',
        payload: removedResearcher
      })
    } else {
      res.status(404).json({
        status: 'error',
        message: 'researcher not found',
        payload: null
      })
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'failed failed remove researcher',
      payload: null
    })
  }
})


module.exports = router;

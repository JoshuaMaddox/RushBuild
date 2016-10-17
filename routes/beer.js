const express = require('express')
const beerRequests = require('../models/beerRequests')
const router = express.Router()


//Send Email With Translation
router.get('/', (req, res) => {
  beerRequests.getRandomBeer((err, beerMe) => {
    res.send(beerMe)
  })
})

router.put('/new', (req, res) => {
  let newBeer = req.query
  beerRequests.saveBeer(newBeer, (err, curBeerList) => {
    res.send(curBeerList)
  })
})

module.exports = router

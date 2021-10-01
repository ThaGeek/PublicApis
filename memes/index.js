
const express = require('express')
const router = express.Router()
const {memeTypes} = require('./options');

router.get('/', function (req, res) {
  return res
      .status(200)
      .send({ types: memeTypes });
})


module.exports = router
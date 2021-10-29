const express = require('express');
const axios = require('axios');
const router = express.Router();
const { memeTypes } = require('./options');
const { body, validationResult } = require('express-validator');

router.get('/', (req, res) => {
  return res.status(200).send({ types: memeTypes });
});

router.post(
  '/generate',
  body('type').not().isEmpty().trim().escape().isIn(memeTypes),
  body('topText').not().isEmpty().trim().escape(),
  body('bottomText').not().isEmpty().trim().escape(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { type = '', topText = '', bottomText = '' } = req.body;
      const response = await axios.get(
        `https://apimeme.com/meme?meme=${type}&top=${topText}&bottom=${bottomText}`,
        {
          responseType: 'arraybuffer',
        },
      );
      const buffer = Buffer.from(response.data, 'utf-8');
      res.end(buffer, 'binary');
    } catch (error) {
      return res.status(500).send({
        message: 'An error has occured while generating your meme !',
      });
    }
  },
);

module.exports = router;

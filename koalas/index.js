const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/random', async (_, res) => {
  try {
    const {
      data: { link },
    } = await axios.get('https://some-random-api.ml/img/koala');
    const response = await axios.get(link, {
      responseType: 'arraybuffer',
    });
    const buffer = Buffer.from(response.data, 'utf-8');
    res.end(buffer, 'binary');
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'An error has occured while generating your koala image !',
    });
  }
});

module.exports = router;

const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/random', async (_, res) => {
  try {
    const {
      data: { url },
    } = await axios.get('https://random-d.uk/api/v2/random');
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    const buffer = Buffer.from(response.data, 'utf-8');
    res.end(buffer, 'binary');
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'An error has occured while generating your dog image !',
    });
  }
});

module.exports = router;

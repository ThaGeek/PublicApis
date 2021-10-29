
const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get('/random',
async function (req, res) {
  try {
      const {data:{url}} = await axios.get("https://nekos.life/api/v2/img/lizard");
      const response = await axios.get(url, {
          responseType:"arraybuffer"
      });
      const buffer = Buffer.from(response.data, "utf-8")
      res.end(buffer, 'binary');
  } catch (error) {

      console.log(error);
      return res.status(500).send({
          message: "An error has occured while generating your lizard image !"
      })
  }

})


module.exports = router
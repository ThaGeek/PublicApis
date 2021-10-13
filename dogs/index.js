
const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get('/random',
async function (req, res) {
  try {
      const {data:{message}} = await axios.get("https://dog.ceo/api/breeds/image/random");
      const response = await axios.get(message, {
          responseType:"arraybuffer"
      });
      const buffer = Buffer.from(response.data, "utf-8")
      res.end(buffer, 'binary');
  } catch (error) {

      console.log(error);
      return res.status(500).send({
          message: "An error has occured while generating your dog image !"
      })
  }

})


module.exports = router
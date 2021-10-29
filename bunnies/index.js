
const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get('/random',
async function (req, res) {
  try {
      const {data:{media:{poster}}} = await axios.get("https://api.bunnies.io/v2/loop/random/?media=png,gif");
      const response = await axios.get(poster, {
          responseType:"arraybuffer"
      });
      const buffer = Buffer.from(response.data, "utf-8")
      res.end(buffer, 'binary');
  } catch (error) {

      console.log(error);
      return res.status(500).send({
          message: "An error has occurred while generating your bunnies image !"
      })
  }

})


module.exports = router
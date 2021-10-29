
const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get('/random',
async function (req, res) {
  try {
      const {data:{image}} = await axios.get("https://randomfox.ca/floof/");
      const response = await axios.get(image, {
          responseType:"arraybuffer"
      });
      const buffer = Buffer.from(response.data, "utf-8")
      res.end(buffer, 'binary');
  } catch (error) {

      console.log(error);
      return res.status(500).send({
          message: "An error has occurred while generating your fox image !"
      })
  }

})


module.exports = router
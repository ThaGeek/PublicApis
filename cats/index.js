
const express = require('express')
const axios = require('axios')
const lodash = require('lodash');

const router = express.Router()

router.get('/random',
async function (req, res) {
  try {
      const {data} = await axios.get("https://api.thecatapi.com/v1/images/search");
      const url = lodash.get(data,"[0].url");

      const response = await axios.get(url, {
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
const express = require("express");
const memes = require("./memes");
const cors = require("cors");
const { get } = require("lodash");
const origins = get(process, "env.allowedOrigins", "").split(",");



// create the server
const app = express();

// add & configure middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", ...origins],
    credentials: true,
  })
);


app.get("/", (req, res) => {
    return res
      .status(200)
      .send({ status: "OK", message: "Hello world" });
});

app.use("/memes", memes);



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Listening on " + port);
});

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get("/", (req, res)=> res.send("Welcome to my server"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, async()=>{
  console.log(`Server started in port ${PORT}`)
})
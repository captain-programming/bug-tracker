const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const UserModel = require("./models/user.model");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get("/", (req, res)=> res.send("Welcome to my server"));

app.post("/signup", async(req, res) =>{
  const {email, password} = req.body;
  try{
    const findUserAccount = await UserModel.findOne({email});
    if(findUserAccount){
      return res.status(404).send({message: "User already exist."});
    }

    const convertHashPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({email, password: convertHashPassword});

    return res.status(200).send({message: "Signing up successfully"})

  }catch(err){
    return res.status(500).send(err.message);
  }
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, async()=>{
  await dbConnect();
  console.log(`Server started in port ${PORT}`)
})
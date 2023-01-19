const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserRoutes = express();

UserRoutes.get("/", (req, res)=> res.send("Welcome to my server"));

//signup
UserRoutes.post("/signup", async(req, res) =>{
  const {email, password} = req.body;
  try{
    const findUserAccount = await UserModel.findOne({email});

    if(findUserAccount){
      return res.status(404).send({message: "User already exist.",status: false});
    }

    const convertHashPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({email, password: convertHashPassword});

    return res.status(200).send({message: "Signing up successfully", status: true})

  }catch(err){
    return res.status(500).send(err.message);
  }
})


//login
UserRoutes.post("/login", async(req, res) =>{
  const {email, password} = req.body;
  try{
    const findUserAccount = await UserModel.findOne({email});

    if(!findUserAccount){
      return res.status(404).send({message: "User does not exist.", status: false});
    }

    const checkPassword= await bcrypt.compare(password, findUserAccount.password);

    if(!checkPassword){
      return res.status(400).send({message: "Invalid Credentials", status: false})
    }

    const token = jwt.sign({email: findUserAccount.email, id: findUserAccount._id}, "secrete", {expiresIn: "1 day"});

    return res.status(200).send({message: "Login Successful", token: token, status: true})

  }catch(err){
    return res.status(500).send(err.message);
  }
})

module.exports = UserRoutes;
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
})

const UserModel = model("users", UserSchema);

module.exports = UserModel;
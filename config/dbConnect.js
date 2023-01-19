const { default: mongoose } = require("mongoose")

const dataConnectUrl = "mongodb+srv://dinesh103:dinesh103DINESH103@cluster0.3pvw9hk.mongodb.net/bug_tracker?retryWrites=true&w=majority"

const dbConnect = () =>{
  return mongoose.connect(dataConnectUrl);
}

module.exports = dbConnect;
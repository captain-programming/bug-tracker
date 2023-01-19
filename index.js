const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const UserRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/", UserRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async()=>{
  await dbConnect();
  console.log(`Server started in port ${PORT}`)
})
require("dotenv").config();
const express = require("express");
const router = require("./routers/dataManu");
const app = express();
const cors = require("cors");
app.use(cors({
  origin : "https://library-management-tx23.onrender.com"
}))
app.use("/data" , router);

app.get("/" , (req,res) => {
  res.send("Welcome to LibMag Services");
});

const port = process.env.PORT || 3000;
app.listen(port , ()=> {
  console.log(`Server is Started at http://localhost:${port}`);
});

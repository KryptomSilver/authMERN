require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const express = require("express");
const cors = require("cors");
const db = require("./db.js");

const app = express();
const port = process.env.PORT;

//MongoDB
db();

//Accept json
app.use(express.json());
app.use(cors());

//Routes
app.get("/api",(req,res)=>{
    res.status(200).send({message:"Welcome REST API"})
})
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.listen(port, () => {
    console.log(`App run on port ${port}`);
});

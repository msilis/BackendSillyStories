const express = require("express");
const app = express();
const port = process.env.PORT || 8086;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//MongoDB
//Connect
mongoose.connect(process.env.DATABASE_URL, { dbName: "sillystories" });

//DB Connection Info
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Silly Stories Database"));

const groupRouter = require("./routes/sillyRoutes");

//Cors options
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://prismatic-clafoutis-caeedc.netlify.app",
  ],
};

app.use(cors(corsOptions));
app.use("/", groupRouter);
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on ${port}`));

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv/config");

//Applying middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
//Database connection
mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch(() => console.log("Could not connect to database"));

//Use Routes
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.write(
    "<h1>The api is running </h1><p>Use the below routes to get data</p><ul><li>localhost:5000/products</li><li>localhost:5000/users</li></ul>"
  );
  res.send();
});

app.listen(5000, console.log("Server has started on port 5000"));

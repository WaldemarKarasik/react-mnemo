const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.json());
app.listen(config.get("port"), () => {
  console.log("Server started");
});

mongoose.connect(
  config.get("mongoUri"),
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) return console.log(err);
    console.log("Connected to database");
  }
);

app.use("/users", require("./routes/user"));
app.use("/words", require("./routes/word"));
app.use('/exercises/spelling', require('./routes/exercises/spelling'))

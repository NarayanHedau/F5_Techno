const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/f5_techno")
  .then(() => {
    console.log("Database Connect Successfully");
  })
  .catch(() => {
    console.log("Unable to Connect Database");
  });

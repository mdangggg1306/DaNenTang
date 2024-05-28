const mongoose = require("mongoose");

// Kết nối đến cơ sở dữ liệu Users
const userDB = mongoose.createConnection(
  "mongodb://localhost:27017/My-App",
  function (err) {
    if (err) {
      console.error("Failed to connect to My-App database: " + err);
    } else {
      console.log("Successfully connected to My-App database");
    }
  }
);

const productbiliDB = mongoose.createConnection(
  "mongodb://localhost:27017/ProductBili",
  function (err) {
    if (err) {
      console.error("Failed to connect to Country database: " + err);
    } else {
      console.log("Successfully connected to Country database");
    }
  }
);

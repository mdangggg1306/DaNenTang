const mongoose = require("mongoose");
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

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
  },
  { collection: "Users" }
);
const UserModel = userDB.model("Users", UserSchema);
module.exports = UserModel;

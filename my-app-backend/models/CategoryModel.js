const mongoose = require("mongoose");
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
const CategorySchema = new mongoose.Schema(
  {
    id: String,
    category: String,
    products: [
      {
        id: String,
        name: String,
        price: String,
        image: String,
        describe: [String],
      },
    ],
  },
  { collection: "Category" }
);

const CategoryModel = productbiliDB.model("Category", CategorySchema);

module.exports = CategoryModel;

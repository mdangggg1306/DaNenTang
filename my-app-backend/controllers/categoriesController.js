const CategoryModel = require("../models/CategoryModel");
const jwt = require("jsonwebtoken");

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

exports.addCategory = async (req, res, next) => {
  try {
    const category = new CategoryModel(req.body);
    const result = await category.save();
    res.json({
      message: "Category added successfully",
      category: result,
    });
  } catch (error) {
    next(error);
  }
};

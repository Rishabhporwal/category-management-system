const Category = require("../models/category");

// Retrieve all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ include: Category });
    return res.status(200).json({ categories });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
};

// Create a category
exports.createCategories = async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const category = await Category.create({ name, parentId });
    return res.status(200).json({ category });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
};

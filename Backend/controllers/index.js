const Category = require("../models/category");

// Retrieve all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ include: Category });
    res.status(200).json({ categories });
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
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// Retrieve a single category by ID
exports.getCategoriesById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId, { include: Category });

    if (!category) {
      res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ category });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
};

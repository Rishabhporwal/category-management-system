const Category = require("../models/category");
const { createTree } = require("../helpers/index");

// Retrieve all categories
exports.getCategories = async (req, res) => {
  try {
    console.log("this.getCategories");
    const categories = await Category.findAll({
      attributes: ["id", "name", "parentId"], // Fetching attributes
    });

    // Creating tree view of Categories
    const result = createTree(categories);

    // send 200 success response
    return res.status(200).json({ result });
  } catch (error) {
    // Log error
    console.error(error);
    // Send failed 500 response
    return res.status(500).json({ error: "An error occurred: ${error}" });
  }
};

// Create a category
exports.createCategories = async (req, res) => {
  try {
    const { name, parentId } = req.body;

    // checking for category name to be empty
    if (!name) {
      // throwing 400 error
      return res.status(400).send({
        message: "Name is missing",
      });
    }

    if (parentId) {
      const parentData = await Category.findByPk(parentId);

      // checking for parent exist
      if (!parentData) {
        // throwing 400 error
        return res.status(400).send({
          message: "Parent category not available",
        });
      }

      // checking for new category name and parent name is same or not
      if (parent.name === name) {
        // throwing 400 error
        return res.status(400).send({
          message: "Category is already available",
        });
      }

      // Fetching categories with same parent category id
      const childrens = await Category.findAll({
        where: { parentId },
      });

      // Checking for same children names
      const isChildPresent = childrens.some((child) => child.name === name);
      if (isChildPresent) {
        // throwing 400 error
        return res.status(400).send({
          message: "Category is already available",
        });
      }
    } else {
      // fetching all root categories
      const root = await Category.findAll({
        where: { parentId: null },
      });

      // Checking for same names
      const isParentPresent = root.some((item) => item.name === name);
      if (isParentPresent) {
        // throwing 400 error
        return res.status(400).send({
          message: "Category is already available",
        });
      }
    }

    // Creating Category
    const category = await Category.create({ name, parentId });

    // send 200 success response
    return res.status(200).json({ category });
  } catch (error) {
    // Log error
    console.error(error);
    // Send failed 500 response
    return res.status(500).json({ error: `An error occurred: ${error}` });
  }
};

// Retrieve a single category by ID
exports.getCategoriesById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId, { include: Category });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(200).json({ category });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, parentId } = req.body;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = name;
    category.parentId = parentId;
    await category.save();
    return res.status(200).json({ category });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await category.destroy();
    return res.status(204).json(`Catogory ${category.name} deleted`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

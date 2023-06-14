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
    return res.status(500).json({ error: `An error occurred: ${error}` });
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

// Update a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const categoryId = Number(req.params.id);
    const { name, parentId } = req.body;

    // checking for name in request
    if (!name) {
      // throwing 400 error
      return res.status(400).send({
        message: "Name is missing",
      });
    }

    // checking for parent id in request
    if (!parentId) {
      // throwing 400 error
      return res.status(400).send({
        message: "Parentid is missing",
      });
    }

    // getting category with categoryid
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (category.parentId) {
      // Fetch Parent Category to be update
      const parent = await Category.findByPk(category.parentId);

      // Checking if parent category exists
      if (!parent) {
        // Throw 400 Error
        return res.status(400).send({
          message: "Parent category not avalable",
        });
      }

      // Check if name we are getting and name from db is same
      if (parent.name === name) {
        // throwing 400 error
        return res.status(400).send({
          message: "Category is already available",
        });
      }

      // Fetching categories with same parent category id
      const children = await Category.findAll({
        where: { parentId },
      });

      // Checking for same children names
      const isChildPresent = children.some((child) => child.name === name);
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

    category.name = name;
    category.parentId = parentId;

    // Updating Categories
    await category.save();
    //sending 200 error response
    return res.status(200).json({ category });
  } catch (error) {
    // Log error
    console.error(error);
    // Send failed 500 response
    return res.status(500).json({ error: `An error occurred: ${error}` });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const parentId = Number(req.params.id);

    // Checking category id is not empty
    if (!id) {
      // throwing 400 error
      res.status(400).send({
        message: "Category id is missing",
      });
    }

    // Fetching categories with same parent category id
    const children = await Category.findAll({
      where: { parentId },
    });

    if (children.length > 0) {
      // throwing 400 error
      res.status(400).send({
        message: "Please delete child categories first",
      });
    }

    // Deleting the category
    const result = await category.destroy();
    if (result !== 1) {
      // throwing 400 error
      res.status(400).send({
        message: "Cannot delete category",
      });
    }
    //sending 200 error response
    return res.status(204).json(`Catogory id: ${parentId} deleted`);
  } catch (error) {
    // Log error
    console.error(error);
    // Send failed 500 response
    return res.status(500).json({ error: `An error occurred: ${error}` });
  }
};

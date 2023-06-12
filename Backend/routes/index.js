const express = require("express");

const router = express.Router();

const {
  getCategories,
  getCategoriesById,
  createCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/index");

router.get("/categories", getCategories);
router.get("/categories/:id", getCategoriesById);
router.post("/categories", createCategories);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

module.exports = router;

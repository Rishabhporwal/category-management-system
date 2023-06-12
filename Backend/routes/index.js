const express = require("express");

const router = express.Router();

const {
  getCategories,
  getCategoriesById,
  createCategories,
} = require("../controllers/index");

router.get("/categories", getCategories);
router.get("/categories/:id", getCategoriesById);
router.post("/categories", createCategories);

module.exports = router;

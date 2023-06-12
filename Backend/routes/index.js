const express = require("express");

const router = express.Router();

const { getCategories, createCategories } = require("../controllers/index");

router.get("/categories", getCategories);
router.post("/categories", createCategories);

module.exports = router;

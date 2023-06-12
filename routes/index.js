const express = require("express");

const router = express.Router();

const { getCategories } = require("../controllers/index");

router.get("/get-categories", getCategories);

module.exports = router;

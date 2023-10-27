const express = require("express");
const router = new express.Router();
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
} = require("../controller/ProductcategoryCtlr");
const { fetchUser, isAdmin } = require("../middleware/authMiddleWare");

router.post("/createcategory", fetchUser, createCategory);
router.put("/:id", fetchUser, updateCategory);
router.delete("/:id", fetchUser, deleteCategory);
router.get("/getallcategory", getAllCategory);
router.get("/:id", fetchUser, getCategory);

module.exports = router;

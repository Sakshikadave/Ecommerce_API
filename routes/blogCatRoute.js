const express = require("express");
const router = new express.Router();
const {
  createBlogCat,
  updateBlogCat,
  getBlogCat,
  getAllBlogs,
  deleteBlogCat,
} = require("../controller/blogCatCtrl");
const { fetchUser } = require("../middleware/authMiddleWare");

router.post("/createblogcat", createBlogCat);
router.put("/updateblogcat/:id", updateBlogCat);
router.get("/getblogcat/:id", getBlogCat);
router.get("/getallblogs", getAllBlogs);
router.delete("/deleteblogcat/:id", deleteBlogCat);

module.exports = router;

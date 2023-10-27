const express = require("express");
const router = express.Router();
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  liketheBlog,
  disliketheBlog,
} = require("../controller/blogController");
const { fetchUser, isAdmin } = require("../middleware/authMiddleWare");

router.post("/", fetchUser, createBlog);
router.put("/updateblog/:id", fetchUser, updateBlog);
router.get("/getblog/:id", fetchUser, getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", fetchUser, deleteBlog);
router.put("/likes", fetchUser, liketheBlog);
router.put("/dislike", fetchUser, disliketheBlog);

module.exports = router;

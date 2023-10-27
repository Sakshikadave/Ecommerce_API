const blogCategory = require("../models/blogCatModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createBlogCat = asyncHandler(async (req, res) => {
  try {
    const newBlogCategory = await blogCategory.create(req.body);
    res.json(newBlogCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//update
const updateBlogCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBlogCat = await blogCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBlogCat);
  } catch (error) {
    throw new Error(error);
  }
});

//getblogcat

const getBlogCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBlogCat = await blogCategory.findById(id);
    res.json(getBlogCat);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const getAllBlogs = await blogCategory.find();
    res.json(getAllBlogs);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBlogCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteBlogCat = await blogCategory.findByIdAndDelete(id);
    res.json(deleteBlogCat);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlogCat,
  updateBlogCat,
  getBlogCat,
  getAllBlogs,
  deleteBlogCat,
};

const express = require("express");
const {
  createProduct,
  getaproduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
} = require("../controller/productController");
const router = new express.Router();
const { fetchUser } = require("../middleware/authMiddleWare");
const { uploadPhoto, productImgResize } = require("../middleware/uploadImages");

router.post("/createproduct", fetchUser, createProduct);
router.put(
  "/upload/:id",
  fetchUser,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
router.get("/:id", getaproduct);
router.put("/wishlist", fetchUser, addToWishlist);
router.put("/rating", fetchUser, rating);
router.put("/:id", fetchUser, updateProduct);
router.delete("/:id", fetchUser, deleteProduct);
router.get("/", getAllProduct);

module.exports = router;

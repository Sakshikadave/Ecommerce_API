const express = require("express");
const {
  createBrand,
  updateBrand,
  getBrand,
  getAllBrands,
  deleteBrands,
} = require("../controller/brandCtrl");
const { fetchUser } = require("../middleware/authMiddleWare");
const router = new express.Router();

router.post("/createbrand", createBrand);
router.put("/updatebrand/:id", fetchUser, updateBrand);
router.get("/getabrand/:id", fetchUser, getBrand);
router.get("/getallbrands", getAllBrands);
router.delete("/deletebrand/:id", fetchUser, deleteBrands);

module.exports = router;

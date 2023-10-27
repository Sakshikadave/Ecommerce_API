const express = require("express");
const { fetchUser, isAdmin } = require("../middleware/authMiddleWare");
const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getACoupon,
} = require("../controller/couponCtrl");
const router = new express.Router();

router.post("/", fetchUser, createCoupon);
router.get("/", fetchUser, getAllCoupons);
router.put("/updatecoupon/:id", updateCoupon);
router.delete("/deletecoupon/:id", deleteCoupon);
router.get("/getacoupon/:id", fetchUser, getACoupon);

module.exports = router;

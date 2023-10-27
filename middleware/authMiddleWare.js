const jwt = require("jsonwebtoken");
const JWT_SECRET = "mytokenis$authenticated";
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Get all
const fetchUser = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["auth-token"];
  if (!token) {
    res
      .status(200)
      .send({ success: false, msg: "A token is required for authorization" });
  }
  try {
    const descode = jwt.verify(token, JWT_SECRET);
    req.user = descode;
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
  return next();
};

// Assuming you have an authentication middleware that populates req.user
const isAdmin = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("you are not an Admin");
  } else {
    next();
  }
});

// const isAdmin = async (req, res, next) => {
//   const token = req.cookies["auth-token"] || req.get("auth-token");
//   if (!token) {
//     return res.status(401).json({ error: "Invalid Token" });
//   }
//   try {
//     const data = jwt.verify(token, JWT_SECRET);
//     const user = await User.findById(data.userId);
//     if (!user) {
//       return res.status(404).clearCookie("auth-token").json("Admin Not Found");
//     }
//     req.user = {
//       id: data.userId,
//       email: user.email, // Make sure the 'email' property is available in the user object
//     };
//     req.isSuper = user.isSuper;
//     next();
//   } catch (error) {
//     throw new Error(error);
//   }
// };

module.exports = { fetchUser, isAdmin };

// const isAdmin = async (req, res, next) => {
//   try {
//     const token = req.cookies?.auth_token || req.headers["auth-token"];
//     if (!token) {
//       return sendErrorResponse(res, 401, "Invalid Token");
//     }

//     try {
//       const data = await jwt.verify(token, JWT_SECRET);
//       const adminId = data.adminId;

//       try {
//         const admin = await Admin.findById(adminId);
//         if (!admin) {
//           return sendErrorResponse(res, 404, "Admin Not Found");
//         }

//         req.admin = adminId;
//         req.isSuper = admin.isSuper;
//         next();
//       } catch (error) {
//         sendErrorResponse(res, 500, "Error finding admin");
//       }
//     } catch (error) {
//       return sendErrorResponse(res, 401, "Invalid Token");
//     }
//   } catch (error) {
//     console.log("Error with token: { " + error.message + " }");
//     sendErrorResponse(res, 419, error.message);
//   }
// };

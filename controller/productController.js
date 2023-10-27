const slugify = require("slugify");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const cloudinaryUploading = require("../utils/cloudinary");
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.send(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//product updation
const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findOneAndUpdate(
      {
        id,
      },
      req.body,
      { new: true }
    );
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//product delete
const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params;
  try {
    const deleteProduct = await Product.findOneAndDelete(
      {
        id,
      },
      req.body,
      { new: true }
    );
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getaproduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);
    res.jsonp(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});
/////http://localhost:8001/api/product?brand=apple&category=mobile&sort=price
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    //filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr));

    //sorting////////http://localhost:8001/api/product?sort=category.brand
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //limites the fields /////////http://localhost:8001/api/product?fields=title,price,category
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //pagination//////////http://localhost:8001/api/product?page=1&limit=4
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip > productCount) throw new Error("This page Does Not Exists");
    }
    console.log(page, limit, skip);

    const product = await query;
    res.json(product);
    //console.log(queryObj, req.query);
    const getallProducts = await Product(queryObj);
    // .where("category").equals(
    //   req.query.category
    // );

    //   {
    //   brand: req.query.brand,
    //   category: req.query.category,
    // }
    // Use a different variable name for the result
    res.json(getallProducts);
  } catch (error) {
    throw new Error(error);
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyAdded) {
      let user = await User.findOneAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findOneAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

// const rating = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   const { star, prodId } = req.body;
//   try {
//     const product = await Product.findById(prodId);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     // Initialize ratings array if it's undefined
//     if (!product.rating) {
//       product.rating = [];
//     }

//     const alreadyRated = product.rating.find(
//       (rating) => rating.postedby.toString() === _id.toString()
//     );

//     if (alreadyRated) {
//       const updatedRating = await Product.updateOne(
//         { "ratings._id": alreadyRated._id },
//         { $set: { "ratings.$.star": star } }
//       );
//       if (updatedRating.nModified === 0) {
//         return res.status(500).json({ error: "Failed to update rating" });
//       }
//       // res.json(updatedRating);
//     } else {
//       const newRating = {
//         star: star,
//         postedby: _id,
//       };

//       product.rating.push(newRating);
//       await product.save();
//       // res.json(newRating);
//     }

//     const getallratings = await Product.findById(prodId);
//     let totalRating = getallratings.rating.length;
//     let ratingsum = getallratings.rating
//       .map((item) => item.star)
//       .reduce((prev, curr) => prev + curr, 0);
//     let actualRating = Math.round(ratingsum / totalRating);
//     let finalproduct = await Product.findByIdAndUpdate(
//       prodId,
//       {
//         totalrating: actualRating,
//       },
//       { new: true }
//     );
//     res.json(finalproduct);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// const rating = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   const { star, prodId } = req.body;
//   try {
//     const product = await Product.findById(prodId);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     // Initialize ratings array if it's undefined
//     if (!product.rating) {
//       product.rating = [];
//     }

//     const alreadyRated = product.rating.find(
//       (rating) =>
//         rating.postedBy && rating.postedBy.toString() === _id.toString()
//     );

//     if (alreadyRated) {
//       const updatedRating = await Product.updateOne(
//         { "rating._id": alreadyRated._id },
//         { $set: { "rating.$.star": star } }
//       );
//       if (updatedRating.nModified === 0) {
//         return res.status(500).json({ error: "Failed to update rating" });
//       }
//     } else {
//       const newRating = {
//         star: star,
//         postedBy: _id,
//       };

//       product.rating.push(newRating);
//       await product.save();
//     }

//     const getallratings = await Product.findById(prodId);
//     let totalRating = getallratings.rating.length;
//     let ratingsum = getallratings.rating
//       .map((item) => item.star)
//       .reduce((prev, curr) => prev + curr, 0);
//     let actualRating = Math.round(ratingsum / totalRating);
//     let finalproduct = await Product.findByIdAndUpdate(
//       prodId,
//       {
//         totalrating: actualRating,
//       },
//       { new: true }
//     );
//     res.json(finalproduct);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });
//--------------------------------------------------------------------------//------------------
//ratings
const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, postBy, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Initialize ratings array if it's undefined
    if (!product.rating) {
      product.rating = [];
    }

    const alreadyRated = product.rating.find(
      (rating) =>
        rating.postedBy && rating.postedBy.toString() === postBy.toString()
    );

    if (alreadyRated) {
      const updatedRating = await Product.updateOne(
        { "rating._id": alreadyRated._id },
        { $set: { "rating.$.star": star, "rating.$.comment": comment } }
      );
      if (updatedRating.nModified === 0) {
        return res.status(500).json({ error: "Failed to update rating" });
      }
    } else {
      const newRating = {
        star: star,
        comment: comment,
        postedBy: postBy,
      };

      product.rating.push(newRating);
      await product.save();
    }

    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.rating.length;
    let ratingsum = getallratings.rating
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createProduct,
  getaproduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
};

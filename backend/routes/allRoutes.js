import express from "express";
import { requireSignin } from "../middlewares";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const cloudinary = require("cloudinary").v2;

import multer from "multer";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

import shortid from "shortid";

const router = express.Router();

const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "uploads/");
  //   },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "DEV",
//   },
// });
const upload = multer({ storage: storage });

import { register, login, logout, currentUser } from "../controllers/auth";
import {
  addProduct,
  getProduct,
  getProducts,
  editProduct,
  deleteProduct,
} from "../controllers/product";
import {
  addCategory,
  getCategories,
  deleteCategory,
} from "../controllers/category";
import {
  addSubCategory,
  getSubCategories,
  deleteSubCategory,
} from "../controllers/subCategory";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);
// product
router.post("/add-product", upload.array("images"), addProduct);
router.get("/get-product/:slug", getProduct);
router.put("/edit-product/:id", editProduct);
router.delete("/delete-product/:id", deleteProduct);
router.get("/all-products", getProducts);
// category
router.post("/add-category", addCategory);
router.get("/all-categories", getCategories);
router.delete("/delete-category/:id", deleteCategory);
// sub category
router.post("/add-subcategory", addSubCategory);
router.get("/all-subcategories", getSubCategories);
router.delete("/delete-subcategory/:id", deleteSubCategory);

module.exports = router;

import axios from "axios";
// const Product = require("../models/product");
import subCategory from "../models/subCategory.js";
import Category from "../models/category.js";
import slugify from "slugify";

export const addSubCategory = async (req, res) => {
  try {
    const categoryObj = {
      name: req.body.name,

      slug: slugify(req.body.name),
      category: req.body.category,
    };

    const newCategory = new subCategory(categoryObj);

    await newCategory.save();
    console.log("Sub Category saved");
    res.send({
      success: true,
      message: "SubCategory added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

function createCategories(categories, parent = null) {
  const categoryList = [];
  let category;
  if (parent == null) {
    category = categories.filter((cat) => cat.parent == undefined);
  } else {
    category = categories.filter((cat) => cat.parent == parent);
  }

  for (let cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      children: createCategories(categories, cat._id),
    });
  }

  return categoryList;
}

export const getSubCategories = async (req, res) => {
  let ids = [];

  const cats = await Category.find({}, { _id: 1 });
  cats.forEach((cat) => {
    ids.push(cat._id);
  });

  // filter
  let cat = req.query.cat;
  let query = cat !== "" ? cat : ids;

  try {
    const subCategoryList = await subCategory
      .find({ category: query })
      .populate("category");

    // const categoryList = createCategories(categories);

    res.send({
      success: true,
      subCategoryList,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSubCategory = async (req, res) => {
  try {
    await subCategory.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Category Deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

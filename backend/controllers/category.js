import axios from "axios";
// const Product = require("../models/product");
import Category from "../models/category.js";
import slugify from "slugify";

export const addCategory = async (req, res) => {
  try {
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name),
    };

    // if (req.body.parent) {
    //   categoryObj.parent = req.body.parent;
    // }

    const newCategory = new Category(categoryObj);

    await newCategory.save();
    console.log("Category saved");
    res.send({
      success: true,
      message: "Category added successfully",
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

export const getCategories = async (req, res) => {
  try {
    const categoryList = await Category.find();

    // const categoryList = createCategories(categories);

    res.send({
      success: true,
      categoryList,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
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

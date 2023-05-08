import axios from "axios";

import Product from "../models/product.js";
import multer from "multer";
import shortid from "shortid";
const cloudinary = require("cloudinary").v2;
import express from "express";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

import slugify from "slugify";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      category,
      subCategory,
      seller,
      year,
      make,
      model,
      type,
      color,
      condition,
      city,
      phone,
    } = req.body;

    let images = [];
    let url;

    for (let i = 0; i < req.files.length; i++) {
      const result = await cloudinary.uploader.upload(req.files[i].path);
      images.push(result.secure_url);
    }

    console.log("Images: ==>", images);

    const newProduct = new Product({
      name: name,
      slug: slugify(name),
      description: description,
      price: price,
      images,
      category,
      subCategory,
      seller,
      year,
      make,
      model,
      type,
      color,
      condition,
      city,
      phone,
    });
    await newProduct.save();
    console.log("product saved");
    res.send({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    let match = {};
    if (req.query.keyword) {
      match.$or = [
        { category: new RegExp(req.query.keyword, "i") },
        { subCategory: new RegExp(req.query.keyword, "i") },
      ];
    }

    const products = await Product.aggregate([{ $match: match }]);

    res.send({
      success: true,
      products,
      // ids,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    if (slug) {
      const product = await Product.findOne({ slug: slug });

      res.send({
        success: true,
        product,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "Product Updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

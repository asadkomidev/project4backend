import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,

      unique: true,
    },
    description: {
      type: String,

      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    subCategory: {
      type: String,
    },
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    //   //   required: true,
    // },
    // subCategory: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "subCategory",
    //   //   required: true,
    // },

    year: {
      type: Number,
    },
    model: {
      type: String,
    },
    make: {
      type: String,
    },
    images: [{ type: String }],
    // images: [
    //   {
    //     img: { type: String },
    //     url: { type: String },
    //   },
    // ],
    condition: {
      type: String,
      default: "",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "pending",
    },
    color: {
      type: String,
    },
    type: {
      type: String,
    },
    city: {
      type: String,
    },
    condition: {
      type: String,
    },
    phone: {
      type: String,
    },
  },

  { timestamps: true }
);

export default mongoose.model("product", productSchema);

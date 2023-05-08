import mongoose from "mongoose";
const { Schema } = mongoose;

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,

      unique: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },

  { timestamps: true }
);

export default mongoose.model("subCategory", subCategorySchema);

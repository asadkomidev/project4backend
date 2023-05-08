import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,

      unique: true,
    },
  },

  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);

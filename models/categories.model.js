import { Schema } from "mongoose";
import mongoose from "mongoose";

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Categories", categoriesSchema);

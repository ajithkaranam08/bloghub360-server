import { Schema } from "mongoose";
import mongoose from "mongoose";

const postSlotSchema = new Schema(
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

export default mongoose.model("PostSlot", postSlotSchema);

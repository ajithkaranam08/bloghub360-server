import { Schema } from "mongoose";
import mongoose from "mongoose";

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bannerImageUrl: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    seo: {
      type: Object
    },
    isTrending: {
      type: Boolean
    },
    slot: {
      type: Schema.Types.ObjectId,
      ref: "PostSlot",
      required: true,
    },
    tags: [{
      type: String
    }]
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);

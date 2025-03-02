import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profile: {
      type: String,
    },
    password:{ type: String, required: true,},
    userRole:{type:String}
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

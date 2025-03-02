import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { Webhook } from "svix";
import userModel from "../models/user.model.js";

export const clerkWebHook = async (req, res) => {
try{
  console.log("inside webhook")
  const WEBHOOK_SECRET = 'whsec_aPJ7rnvEPOiqX19XjZvNC0opFH2fm2rI';
  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook secret needed!");
  }
  const evt = req.body;
  const headers = req.headers;
 console.log("aji",evt.data)
 console.log("aji-2",evt.type)
  if (evt.type === "user.created") {
    let userCreation = await userModel.create({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_img_url,
    })
    console.log(userCreation)
  }
  if (evt.type === "user.deleted") {
    const deletedUser = await User.findOneAndDelete({
      clerkUserId: evt.data.id,
    });
    console.log("deletedUser",deletedUser)
    await Post.deleteMany({user:deletedUser._id})
  }
  return true
}catch(error){
  throw error
}
};

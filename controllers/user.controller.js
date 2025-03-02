import User from "../models/user.model.js";

export const getUserSavedPosts = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  res.status(200).json(user.savedPosts);
};
export const savePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  const isSaved = user.savedPosts.some((p) => p === postId);

  if (!isSaved) {
    await User.findByIdAndUpdate(user._id, {
      $push: { savedPosts: postId },
    });
  } else {
    await User.findByIdAndUpdate(user._id, {
      $pull: { savedPosts: postId },
    });
  }

  res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
};

export async function createUser(req, res) {
  try {
    const { username, email, password, profile, userRole } = req.body
    let createdUser = await User.create({
      username: username,
      email: email,
      password: password,
      profile: profile,
      userRole: userRole
    })
    return res.json({
      success: true,
      payload: createdUser,
    });
  } catch (error) {
    console.log(error)
    throw error
  }
}
export async function loginUser(req, res) {
  try {
    const { username, email, password } = req.body
   let userDetail = await User.findOne({
    email:email
   })
   if(!userDetail){
    throw "user not found"
   }

   if(userDetail?.password !== password){
    throw "passowrd was wrong"
   }
    return res.json({
      success: true,
      payload: userDetail,
    });
  } catch (error) {
    console.log(error)
    throw error
  }
}
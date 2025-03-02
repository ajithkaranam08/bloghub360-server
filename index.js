import express from "express";
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import seoRouter from "./routes/seo.route.js";
import postRouter from "./routes/post.route.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors(process.env.CLIENT_URL));
app.use(clerkMiddleware());
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/webhooks", webhookRouter);

app.get("/test",(req,res)=>{
  res.status(200).send("it works!")
})
// app.get("/auth-state", (req, res) => {
//   const authState = req.auth;
//   res.json(authState);
// });
// app.get("/protect", (req, res) => {
//   const {userId} = req.auth;
//   if(!userId){
//     return res.status(401).json("not authenticated")
//   }
//   res.status(200).json("content")
// });
// app.get("/protect2", requireAuth(), (req, res) => {
//   res.status(200).json("content")
// });
app.use("/seo",seoRouter)
app.use("/users", userRouter);
app.use("/posts", postRouter);

// app.use((error, req, res, next) => {
//   res.status(error.status || 500).json({
//     message: error.message || "Something went wrong!",
//     status: error.status,
//     stack: error.stack,
//   });
// });

app.listen(3101, () => {
  connectDB();
  console.log("Server is running!");
});

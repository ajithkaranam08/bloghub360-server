import express from "express";
import {
 checkSeo
} from "../controllers/seo.controller.js";

const router = express.Router();

router.post("/check-seo", checkSeo);

export default router;

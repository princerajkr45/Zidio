import express from "express";
import { registerUser, loginUser, getUser, uploadUserProfile } from "../controllers/user.controllers.js";
import upload from "../config/multerConfig.js";


const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/get-user",getUser);
router.post("/upload-profile", upload.single("profile"), uploadUserProfile);

export default router;

import express from "express";
import {
	loginController,
	privateController,
	registerController,
} from "../controllers/authController";
import verifyAuth from "../middlewares/verifyAuth";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/private", verifyAuth, privateController);

export default router;

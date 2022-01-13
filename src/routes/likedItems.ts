import express from "express";
import {
	checkForLikedItemsController,
	addItemToLikedItems,
	removeFromlikedItems,
} from "../controllers/likedItemsController";

const router = express.Router();

router.post("/", checkForLikedItemsController);

router.put("/addToLikes", addItemToLikedItems);

router.put("/removeFromLikes", removeFromlikedItems);

export default router;

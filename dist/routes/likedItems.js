"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likedItemsController_1 = require("../controllers/likedItemsController");
const router = express_1.default.Router();
router.post("/", likedItemsController_1.checkForLikedItemsController);
router.put("/addToLikes", likedItemsController_1.addItemToLikedItems);
router.put("/removeFromLikes", likedItemsController_1.removeFromlikedItems);
exports.default = router;

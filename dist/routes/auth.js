"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const verifyAuth_1 = __importDefault(require("../middlewares/verifyAuth"));
const router = express_1.default.Router();
router.post("/register", authController_1.registerController);
router.post("/login", authController_1.loginController);
router.get("/private", verifyAuth_1.default, authController_1.privateController);
exports.default = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, product } = req.body;
    try {
        const user = yield User_1.default.findById(_id);
        const productExists = user.cart.find((item) => {
            return item.id === product.id;
        });
        if (productExists)
            return res.status(400).send({ error: "Product already in cart" });
        user.cart = [...user.cart, product];
        yield user.save();
        res.send(user);
    }
    catch (err) {
        console.log(err.message);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    try {
        const user = yield User_1.default.findById(_id);
        res.send(user.cart);
    }
    catch (err) {
        console.log(err.message);
    }
}));
router.delete("/:_id/:productId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, _id } = req.params;
    try {
        const user = yield User_1.default.findById(_id);
        const items = user.cart.filter((item) => item.id.toString() !== productId);
        user.cart = items;
        yield user.save();
        res.send(user.cart);
    }
    catch (err) {
        console.log(err.message);
    }
}));
router.delete("/:_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    try {
        const user = yield User_1.default.findById(_id);
        user.cart = [];
        yield user.save();
        res.send(user.cart);
    }
    catch (err) {
        res.status(400).send({ error: "Failed to delete cart" });
        console.log(err.message);
    }
}));
exports.default = router;

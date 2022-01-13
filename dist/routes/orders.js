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
router.get("/:_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    try {
        const user = yield User_1.default.findById(_id);
        res.send(user.orders);
    }
    catch (err) {
        res.status(400).send({ error: err.message });
        console.log(err.message);
    }
}));
router.put("/:_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const user = yield User_1.default.findById(req.params._id);
        user.orders = [...user.orders, req.body.product];
        const savedUser = yield user.save();
        res.send(savedUser);
    }
    catch (err) {
        res.status(400).send({ error: err.message });
        console.log(err.message);
    }
}));
router.delete("/:_id/:productId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, productId } = req.params;
    try {
        const user = yield User_1.default.findById(_id);
        res.send(user.orders);
    }
    catch (err) {
        res.status(400).send({ error: err.message });
        console.log(err.message);
    }
    res.send(req.query._id);
}));
exports.default = router;

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
exports.loginController = exports.registerController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const validation_1 = require("../validation");
function registerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        const { error } = (0, validation_1.registerValidation)(req.body);
        if (error)
            return res.status(400).send({ error: error.details[0].message });
        try {
            const emailExists = yield User_1.default.findOne({ email: req.body.email });
            if (emailExists)
                return res.status(400).send("User already exists");
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            const user = new User_1.default({
                name,
                email,
                password: hashedPassword,
            });
            const savedUser = yield user.save();
            res.send({ id: savedUser._id });
        }
        catch (err) {
            res.status(400).send({ error: err.message });
        }
    });
}
exports.registerController = registerController;
function loginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield User_1.default.findOne({ email: email });
            if (!user)
                return res.status(400).send({ error: "Username or password incorrect" });
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch)
                return res.status(400).send({ error: "Username or password incorrect" });
            res.send(user.name + " logged in");
        }
        catch (err) {
            res.status(400).send({ error: err.message });
        }
    });
}
exports.loginController = loginController;

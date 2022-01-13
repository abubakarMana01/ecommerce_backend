"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
const auth_1 = __importDefault(require("./routes/auth"));
const likedItems_1 = __importDefault(require("./routes/likedItems"));
const cart_1 = __importDefault(require("./routes/cart"));
const orders_1 = __importDefault(require("./routes/orders"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
mongoose_1.default.connect(`${process.env.MONGO_URI}`, (err) => {
    if (err)
        return console.log(err.message);
    console.log("Connected to database");
});
app.use(express_1.default.json());
app.get("/", (req, res) => res.send("hello"));
// Routes
app.use("/auth", auth_1.default);
app.use("/likedItems", likedItems_1.default);
app.use("/cart", cart_1.default);
app.use("/orders", orders_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

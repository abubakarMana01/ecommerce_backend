import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";

import authRoute from "./routes/auth";
import likedItemsRoute from "./routes/likedItems";
import cartRoutes from "./routes/cart";
import ordersRoutes from "./routes/orders";

config();
const app = express();

mongoose.connect(`${process.env.MONGO_URI}`, (err) => {
	if (err) return console.log(err.message);

	console.log("Connected to database");
});

app.use(express.json());

app.get("/", (req, res) => res.send("hello"));

// Routes
app.use("/auth", authRoute);
app.use("/likedItems", likedItemsRoute);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

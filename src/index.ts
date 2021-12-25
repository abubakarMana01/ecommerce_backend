import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import authRoute from "./routes/auth";

config();
const app = express();

mongoose.connect(`${process.env.MONGO_URI}`, (err) => {
	if (err) return console.log(err.message);

	console.log("Connected to database");
});

app.use(express.json());

// Routes
app.use("/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

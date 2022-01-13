import mongoose from "mongoose";

const schema = new mongoose.Schema({
	username: { required: true, type: String },
	email: { required: true, type: String },
	password: { required: true, type: String },
	likedProducts: [],
	cart: [],
	orders: [],
	date: { default: Date.now, type: Date },
});

export default mongoose.model("User", schema);

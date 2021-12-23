import mongoose from "mongoose";

const schema = new mongoose.Schema({
	name: { required: true, type: String },
	email: { required: true, type: String },
	password: { required: true, type: String },
	date: { default: Date.now, type: Date },
});

export default mongoose.model("User", schema);

import express from "express";
import User from "../models/User";

const router = express.Router();

router.get("/:_id", async (req, res) => {
	const { _id } = req.params;

	try {
		const user = await User.findById(_id);
		res.send(user.orders);
	} catch (err: any) {
		res.status(400).send({ error: err.message });
		console.log(err.message);
	}
});

router.put("/:_id", async (req, res) => {
	console.log(req.body);

	try {
		const user = await User.findById(req.params._id);

		user.orders = [...user.orders, req.body.product];

		const savedUser = await user.save();
		res.send(savedUser);
	} catch (err: any) {
		res.status(400).send({ error: err.message });
		console.log(err.message);
	}
});

router.delete("/:_id/:productId", async (req, res) => {
	const { _id, productId } = req.params;

	try {
		const user = await User.findById(_id);
		res.send(user.orders);
	} catch (err: any) {
		res.status(400).send({ error: err.message });
		console.log(err.message);
	}
	res.send(req.query._id);
});

export default router;

import express from "express";
import User from "../models/User";

const router = express.Router();

router.put("/", async (req, res) => {
	const { _id, product } = req.body;

	try {
		const user = await User.findById(_id);

		const productExists = user.cart.find((item: any) => {
			return item.id === product.id;
		});
		if (productExists)
			return res.status(400).send({ error: "Product already in cart" });

		user.cart = [...user.cart, product];
		await user.save();
		res.send(user);
	} catch (err: any) {
		console.log(err.message);
	}
});

router.post("/", async (req, res) => {
	const { _id } = req.body;

	try {
		const user = await User.findById(_id);
		res.send(user.cart);
	} catch (err: any) {
		console.log(err.message);
	}
});

router.delete("/:_id/:productId", async (req, res) => {
	const { productId, _id } = req.params;

	try {
		const user = await User.findById(_id);

		const items = user.cart.filter(
			(item: any) => item.id.toString() !== productId
		);

		user.cart = items;

		await user.save();
		res.send(user.cart);
	} catch (err: any) {
		console.log(err.message);
	}
});

router.delete("/:_id", async (req, res) => {
	const { _id } = req.params;

	try {
		const user = await User.findById(_id);

		user.cart = [];

		await user.save();
		res.send(user.cart);
	} catch (err: any) {
		res.status(400).send({ error: "Failed to delete cart" });
		console.log(err.message);
	}
});

export default router;

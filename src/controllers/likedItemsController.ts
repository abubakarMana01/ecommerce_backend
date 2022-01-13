import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";

async function checkForLikedItemsController(req: Request, res: Response) {
	try {
		const user = await User.findById(req.body._id);
		res.send(user.likedProducts);
	} catch (err: any) {
		console.log(err.message);
	}
}

async function addItemToLikedItems(req: Request, res: Response) {
	const { productId, _id } = req.body;

	try {
		const user = await User.findById(_id);
		const itemExists = user.likedProducts.find(
			(item: string) => item === productId
		);
		if (itemExists)
			return res.status(400).send({ error: "Product already in likes" });

		user.likedProducts = [...user.likedProducts, productId];
		await user.save();
		res.send({ user });
	} catch (err: any) {
		console.log(err);
	}
}

async function removeFromlikedItems(req: Request, res: Response) {
	const { productId, _id } = req.body;

	try {
		const user = await User.findById(_id);
		const newLikedProducts = user.likedProducts.filter(
			(products: string) => products !== productId
		);
		user.likedProducts = newLikedProducts;
		await user.save();
		res.send({ user });
	} catch (err: any) {
		console.log(err);
	}
}

export {
	checkForLikedItemsController,
	addItemToLikedItems,
	removeFromlikedItems,
};

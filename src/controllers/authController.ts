import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";
import { registerValidation } from "../validation";

async function registerController(req: Request, res: Response) {
	const { username, email, password } = req.body;

	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send({ error: error.details[0].message });

	try {
		let emailExists = await User.findOne({ email: req.body.email });
		if (emailExists)
			return res.status(400).send({ error: "User already exists" });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({
			likedProducts: [],
			cart: [],
			orders: [],
			username,
			email,
			password: hashedPassword,
		});

		const savedUser = await user.save();
		res.send({ user: savedUser });
	} catch (err: any) {
		console.log(err.message);
		res.status(400).json({ error: err.message });
	}
}

async function loginController(req: Request, res: Response) {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email: email });
		if (!user)
			return res.status(400).send({ error: "Username or password incorrect" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).send({ error: "Username or password incorrect" });

		const token = jwt.sign({ user }, `${process.env.JWT_SECRET}`, {
			expiresIn: "5m",
		});
		res.header("x-auth-token", token).send({ token, user });
	} catch (err: any) {
		res.status(400).send({ error: err.message });
	}
}

async function privateController(req: Request, res: Response) {
	try {
		const user = await User.find();
		res.send({ user });
	} catch (err: any) {
		res.status(400).send({ error: err.message });
	}
}

export { registerController, loginController, privateController };

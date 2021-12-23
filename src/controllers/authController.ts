import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { registerValidation } from "../validation";

async function registerController(req: Request, res: Response) {
	const { name, email, password } = req.body;

	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send({ error: error.details[0].message });

	try {
		const emailExists = await User.findOne({ email: req.body.email });
		if (emailExists) return res.status(400).send("User already exists");

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({
			name,
			email,
			password: hashedPassword,
		});

		const savedUser = await user.save();
		res.send({ id: savedUser._id });
	} catch (err: any) {
		res.status(400).send({ error: err.message });
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

		res.send(user.name + " logged in");
	} catch (err: any) {
		res.status(400).send({ error: err.message });
	}
}

export { registerController, loginController };

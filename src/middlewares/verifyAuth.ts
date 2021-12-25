import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default async function (req: any, res: Response, next: NextFunction) {
	const token = req.header("x-auth-token");
	if (!token) return res.status(401).send("Access denied. No token provided.");

	try {
		const user = await jwt.verify(token, `${process.env.JWT_SECRET}`);
		req.user = user;
		next();
	} catch (err: any) {
		res.status(400).send({ error: "Invalid token." });
	}
}

import Joi from "joi";

function registerValidation(data: {
	username: string;
	email: string;
	password: string;
}) {
	const schema = Joi.object({
		username: Joi.string().required().min(3).max(255).label("Username"),
		email: Joi.string().email().required().min(3).max(255).label("Email"),
		password: Joi.string().required().min(6).max(1024).label("Password"),
	});

	return schema.validate(data);
}

function loginValidation(data: { email: string; password: string }) {
	const schema = Joi.object({
		email: Joi.string().email().required().min(3).max(255),
		password: Joi.string().required().min(6).max(1024),
	});

	return schema.validate(data);
}

export { registerValidation, loginValidation };

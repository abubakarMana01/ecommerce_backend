import Joi from "joi";

function registerValidation(data: {
	name: string;
	email: string;
	password: string;
}) {
	const schema = Joi.object({
		name: Joi.string().required().min(3).max(255).label("Name"),
		email: Joi.string().email().required().min(3).max(255).label("Email"),
		password: Joi.string().required().min(6).max(1024).label("Password"),
		accountNumber: Joi.string()
			.required()
			.min(9)
			.max(9)
			.label("Account Number"),
		phoneNumber: Joi.string().required().min(11).max(11).label("Phone Number"),
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

import Joi from "joi";

// 🎯 Register Validation
export const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^\d{10}$/)
      .required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

// 🎯 Login Validation
export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

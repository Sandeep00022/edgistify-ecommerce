import Joi from "joi";

export const cartValidationSchema = Joi.object({
  user: Joi.string().required(), // User ID
  items: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required(), // Product ID
        quantity: Joi.number().min(1).required(),
        price: Joi.number().min(0).required(),
        totalItemPrice: Joi.number().min(0).required(),
      })
    )
    .min(1)
    .required(),
  totalPrice: Joi.number().min(0).optional(),
});

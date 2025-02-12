import Joi from "joi";

export const productValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(2000).required(),
  price: Joi.number().min(0).required(),
  discountPrice: Joi.number()
    .min(0)
    .less(Joi.ref("price")) 
    .optional(),
  images: Joi.array().items(Joi.string().uri()).min(1).required(),
  category: Joi.string()
    .valid(
      "electronics",
      "fashion",
      "home_appliances",
      "books",
      "toys",
      "sports",
      "beauty",
      "automotive",
      "grocery"
    )
    .required(),
  brand: Joi.string().min(2).max(50).required(),
  stock: Joi.number().min(0).required(),
});

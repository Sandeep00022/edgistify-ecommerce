import Joi from "joi";

export const orderValidationSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().hex().length(24).required(),
        quantity: Joi.number().min(1).required(),
        price: Joi.number().min(0).required(),
      })
    )
    .min(1)
    .required(),
  totalPrice: Joi.number().min(0).required(),
  shippingAddress: Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    phone: Joi.string()
      .pattern(/^\d{10}$/)
      .required(),
    addressLine1: Joi.string().min(5).max(100).required(),
    addressLine2: Joi.string().allow(""),
    city: Joi.string().min(2).max(50).required(),
    state: Joi.string().min(2).max(50).required(),
    country: Joi.string().min(2).max(50).required(),
    postalCode: Joi.string().min(4).max(10).required(),
  }).required(),
  paymentInfo: Joi.object({
    method: Joi.string()
      .valid("cod", "credit_card", "debit_card", "paypal", "upi")
      .required(),
    status: Joi.string()
      .valid("pending", "paid", "failed", "refunded")
      .default("pending"),
    transactionId: Joi.string().allow(null),
  }).required(),
});

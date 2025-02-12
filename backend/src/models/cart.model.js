import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User Model
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Reference to Product Model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity cannot be less than 1"],
          validate: {
            validator: async function (value) {
              const product = await mongoose
                .model("Product")
                .findById(this.product);
              return product && value <= product.stock;
            },
            message: "Quantity exceeds available stock",
          },
        },
        price: {
          type: Number,
          required: true,
        },
        totalItemPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

CartSchema.pre("save", async function (next) {
  this.totalPrice = this.items.reduce(
    (acc, item) => acc + item.totalItemPrice,
    0
  );
  next();
});

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;

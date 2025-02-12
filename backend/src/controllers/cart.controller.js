import { cartValidationSchema } from "../../utils/validators/cart.validators.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// 🛒 Add or Update Cart Item
export const addToCart = async (req, res) => {
  try {
    const { error } = cartValidationSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { user, items } = req.body;
    let cart = await Cart.findOne({ user });

    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      if (item.quantity > product.stock)
        return res
          .status(400)
          .json({ message: `Only ${product.stock} items available in stock` });

      item.price = product.price;
      item.totalItemPrice = item.quantity * item.price;
    }

    if (!cart) {
      cart = new Cart({ user, items, totalPrice: 0 });
    } else {
      items.forEach((newItem) => {
        const existingItem = cart.items.find(
          (item) => item.product.toString() === newItem.product
        );
        if (existingItem) {
          existingItem.quantity = newItem.quantity;
          existingItem.totalItemPrice = newItem.totalItemPrice;
        } else {
          cart.items.push(newItem);
        }
      });
    }

    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.totalItemPrice,
      0
    );
    await cart.save();

    return res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// 📌 Get User Cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price images"
    );
    if (!cart) return res.status(404).json({ message: "Cart is empty" });

    return res.status(200).json(cart);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// 🗑 Remove Item from Cart
export const removeFromCart = async (req, res) => {
  try {
    const { user } = req.body;
    const { productId } = req.params;

    let cart = await Cart.findOne({ user });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.totalItemPrice,
      0
    );

    await cart.save();
    return res.status(200).json({ message: "Item removed successfully", cart });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// 🚀 Clear Cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await Cart.findOneAndDelete({ user: userId });

    return res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

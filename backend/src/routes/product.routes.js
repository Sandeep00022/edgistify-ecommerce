import express from "express";
import {
  authMiddleware,
  authorizeMiddleware,
} from "../middlewares/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", authMiddleware, authorizeMiddleware("admin"), createProduct);

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.put("/:id", authMiddleware, authorizeMiddleware("admin"), updateProduct);

router.delete(
  "/:id",
  authMiddleware,
  authorizeMiddleware("admin"),
  deleteProduct
);

export default router;

import express from "express";
import {
  deleteOrder,
  getAllOrders,
  getMyOrders,
  placeOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import {
  authMiddleware,
  authorizeMiddleware,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, placeOrder);
router.get("/my-orders", authMiddleware, getMyOrders);
router.get("/", authMiddleware, authorizeMiddleware("admin"), getAllOrders);
router.put(
  "/:orderId/status",
  authMiddleware,
  authorizeMiddleware("admin"),
  updateOrderStatus
);
router.delete(
  "/:orderId",
  authMiddleware,
  authorizeMiddleware("admin"),
  deleteOrder
);

export default router;

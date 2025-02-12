import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../redux/order/orderSlice.js";
import {
  CircularProgress,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Order = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (loading) return <CircularProgress className="mx-auto mt-10" />;
  if (error)
    return (
      <Typography variant="h6" className="text-red-600 text-center">
        {error}
      </Typography>
    );

  return (
    <Box className="max-w-7xl mx-auto px-6 py-12">
      <Typography
        variant="h3"
        className="text-center text-gray-800 font-semibold mb-8"
      >
        My Orders
      </Typography>

      {orders.length > 0 ? (
        <TableContainer
          component={Paper}
          elevation={6}
          className="shadow-xl rounded-lg"
        >
          <Table aria-label="my orders table">
            <TableHead>
              <TableRow>
                <TableCell className="font-semibold text-gray-800">
                  Order ID
                </TableCell>
                <TableCell className="font-semibold text-gray-800">
                  Status
                </TableCell>
                <TableCell className="font-semibold text-gray-800">
                  Total
                </TableCell>
                <TableCell className="font-semibold text-gray-800">
                  Placed On
                </TableCell>
                <TableCell className="font-semibold text-gray-800">
                  Items
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="text-gray-700">{order._id}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.status === "Completed"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </Typography>
                  </TableCell>
                  <TableCell className="text-gray-700">
                    ${order?.totalPrice?.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      {order.items.map((item, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          className="text-gray-600"
                        >
                          {item.product.name} ({item.quantity} x ${item.price})
                        </Typography>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" className="text-center text-gray-500 mt-8">
          You have no orders yet
        </Typography>
      )}
    </Box>
  );
};

export default Order;

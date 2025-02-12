import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Grid,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { placeOrder } from "../redux/order/orderSlice";
import { Typography } from "@material-tailwind/react";
import {
  LocationOn,
  Phone,
  Person,
  Payment,
  LocalShipping,
} from "@mui/icons-material";
import { clearCartData } from "../redux/cart/cartSlice";

const OrderModal = ({ open, handleClose, orderDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalPrice } = orderDetails;

  const [shippingAddress, setShippingAddress] = useState(
    orderDetails.shippingAddress
  );
  const [paymentInfo, setPaymentInfo] = useState({
    ...orderDetails.paymentInfo,
    status: orderDetails.paymentInfo.status || "paid",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    const { value } = e.target;
    setPaymentInfo({ ...paymentInfo, method: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!shippingAddress.fullName) newErrors.fullName = "Full name is required";
    if (!shippingAddress.phone) newErrors.phone = "Phone is required";
    if (!shippingAddress.addressLine1)
      newErrors.addressLine1 = "Address Line 1 is required";
    if (!shippingAddress.city) newErrors.city = "City is required";
    if (!shippingAddress.state) newErrors.state = "State is required";
    if (!shippingAddress.country) newErrors.country = "Country is required";
    if (!shippingAddress.postalCode)
      newErrors.postalCode = "Postal Code is required";
    if (!paymentInfo.method)
      newErrors.paymentMethod = "Payment method is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { totalPrice, items, shippingAddress, paymentInfo };

    try {
      dispatch(placeOrder(payload));
      setSuccessMessage("Order placed successfully! 😊");
      dispatch(clearCartData());

      setTimeout(() => {
        navigate("/");
        handleClose();
      }, 2000);
    } catch (error) {
      toast.error("Failed to place the order.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle
        className="text-lg font-semibold"
        sx={{ bgcolor: "#f8f9fa", py: 3 }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: 600, color: "#2d3748" }}
        >
          🚚 Complete Your Order
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1, color: "#718096" }}>
          Total Amount: ${totalPrice.toFixed(2)}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ py: 4 }}>
        {successMessage && (
          <div
            className="flex justify-between items-center p-4 mb-4 text-white font-semibold"
            style={{
              backgroundColor: "#48bb78",
              borderRadius: "8px",
            }}
          >
            <span>{successMessage}</span>
            <span role="img" aria-label="smile">
              😊
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Shipping Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <LocalShipping fontSize="medium" sx={{ color: "#4a5568" }} />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#2d3748" }}
                >
                  Shipping Information
                </Typography>
              </div>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: "#a0aec0" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mt: 1 }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone sx={{ color: "#a0aec0" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mt: 1 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address Line 1"
                    variant="outlined"
                    name="addressLine1"
                    value={shippingAddress.addressLine1}
                    onChange={handleInputChange}
                    error={!!errors.addressLine1}
                    helperText={errors.addressLine1}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn sx={{ color: "#a0aec0" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mt: 1 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address Line 2 (Optional)"
                    variant="outlined"
                    name="addressLine2"
                    value={shippingAddress.addressLine2}
                    onChange={handleInputChange}
                    sx={{ mt: 1 }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="City"
                    variant="outlined"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    error={!!errors.city}
                    helperText={errors.city}
                    sx={{ mt: 1 }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="State"
                    variant="outlined"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    error={!!errors.state}
                    helperText={errors.state}
                    sx={{ mt: 1 }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    variant="outlined"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleInputChange}
                    error={!!errors.postalCode}
                    helperText={errors.postalCode}
                    sx={{ mt: 1 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Country"
                    variant="outlined"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    error={!!errors.country}
                    helperText={errors.country}
                    sx={{ mt: 1 }}
                  />
                </Grid>
              </Grid>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Payment fontSize="medium" sx={{ color: "#4a5568" }} />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#2d3748" }}
                >
                  Payment Details
                </Typography>
              </div>

              <TextField
                select
                fullWidth
                label="Select Payment Method"
                variant="outlined"
                value={paymentInfo.method}
                onChange={handlePaymentMethodChange}
                error={!!errors.paymentMethod}
                helperText={errors.paymentMethod}
                sx={{ mt: 1 }}
              >
                <MenuItem value="cod" sx={{ py: 2 }}>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://cdn1.vectorstock.com/i/1000x1000/79/75/cash-on-delivery-icon-black-sign-vector-35237975.jpg"
                      alt="COD"
                      className="w-6 h-6"
                    />
                    <span>Cash on Delivery (COD)</span>
                  </div>
                </MenuItem>
              </TextField>
            </div>
          </div>
        </form>
      </DialogContent>

      <DialogActions sx={{ px: 4, py: 3, bgcolor: "#f8f9fa" }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            color: "#4a5568",
            borderColor: "#cbd5e0",
            "&:hover": { borderColor: "#a0aec0" },
            px: 4,
            py: 1.5,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bgcolor: "#4f46e5",
            "&:hover": { bgcolor: "#4338ca" },
            px: 4,
            py: 1.5,
            ml: 2,
          }}
        >
          Confirm Payment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderModal;

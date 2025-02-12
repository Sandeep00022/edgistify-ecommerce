import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/cart";

// Helper to get the token dynamically
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  return user?.token ? `Bearer ${user.token}` : "";
};

// Fetch User Cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: getToken() },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Add Item to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/add`, cartData, {
        headers: { Authorization: getToken() },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to add item to cart"
      );
    }
  }
);

// Increase Item Quantity
export const increaseProductQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/increase/${productId}`,
        {},
        { headers: { Authorization: getToken() } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to increase quantity"
      );
    }
  }
);

// Decrease Item Quantity
export const decreaseProductQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/decrease/${productId}`,
        {},
        { headers: { Authorization: getToken() } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to decrease quantity"
      );
    }
  }
);

// Remove Item from Cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/remove/${productId}`, {
        headers: { Authorization: getToken() },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to remove item from cart"
      );
    }
  }
);

// Clear Cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete(API_URL + "/clear", {
        headers: { Authorization: getToken() },
      });
      return {};
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to clear cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: { user: null, items: [], totalPrice: 0 },
    loading: false,
    error: null,
    cartItemCount:0
  },
  reducers: {
    clearCartData: (state) => {
      state.cart = { user: null, items: [], totalPrice: 0 };
      state.cartItemCount = 0;
    },
    updateCartItemCount: (state) => {
      state.cartItemCount = state.cart.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload || { user: null, items: [], totalPrice: 0 };
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.items = action.payload.items;
        state.cart.totalPrice = action.payload.totalPrice;
      })
      .addCase(increaseProductQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.items = action.payload.items;
        state.cart.totalPrice = action.payload.totalPrice;
      })
      .addCase(decreaseProductQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.items = action.payload.items;
        state.cart.totalPrice = action.payload.totalPrice;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.items = action.payload.items;
        state.cart.totalPrice = action.payload.totalPrice;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = { user: null, items: [], totalPrice: 0 };
      });
  },
});

export const { clearCartData, updateCartItemCount } = cartSlice.actions;
export default cartSlice.reducer;

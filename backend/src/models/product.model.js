import mongoose from "mongoose";
import slugify from "slugify";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
      unique: true, 
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minlength: 10,
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    discountPrice: {
      type: Number,
      min: [0, "Discount price must be a positive number"],
      validate: {
        validator: function (value) {
          return !this.price || value < this.price;
        },
        message: "Discount price should be less than the original price",
      },
    },
    images: {
      type: [String],
      required: [true, "At least one product image is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "electronics",
        "fashion",
        "home_appliances",
        "books",
        "toys",
        "sports",
        "beauty",
        "automotive",
        "grocery",
      ],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
    },
    stockStatus: {
      type: String,
      enum: ["in_stock", "out_of_stock", "low_stock"],
      default: "in_stock",
    },
    ratings: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot exceed 5"],
    },
    numReviews: {
      type: Number,
      default: 0,
      min: [0, "Number of reviews cannot be negative"],
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: String,
        rating: {
          type: Number,
          min: 1,
          max: 5,
          required: true,
        },
        comment: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 500,
        },
      },
    ],
  },
  { timestamps: true }
);

// 🔹 Auto-generate a slug before saving
ProductSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

// 🔹 Update stock status based on stock count
ProductSchema.pre("save", function (next) {
  if (this.stock === 0) {
    this.stockStatus = "out_of_stock";
  } else if (this.stock < 5) {
    this.stockStatus = "low_stock";
  } else {
    this.stockStatus = "in_stock";
  }
  next();
});

// 🔹 Calculate average rating dynamically
ProductSchema.methods.calculateAvgRating = function () {
  if (this.reviews.length > 0) {
    this.ratings =
      this.reviews.reduce((acc, review) => acc + review.rating, 0) /
      this.reviews.length;
    this.numReviews = this.reviews.length;
  } else {
    this.ratings = 0;
    this.numReviews = 0;
  }
};

// 🔹 Indexes for faster queries
ProductSchema.index({ name: 1, category: 1, brand: 1 });

const Product = mongoose.model("Product", ProductSchema);
export default Product;

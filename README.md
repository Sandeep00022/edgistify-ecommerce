# edgistify-ecommerce

Here's a brief `README.md` to guide the setup of both your backend and frontend using a Vite React app:



# Project Setup Guide

## Prerequisites

Before setting up the backend and frontend, make sure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn** (v1.22 or higher)
- **MongoDB** (or a cloud MongoDB service like Atlas)

## Backend Setup

The backend is built with **Node.js**, **Express.js**, and **MongoDB**.

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Backend Dependencies

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root of the backend folder and configure the following environment variables:

```plaintext
MONGO_URI=<your-mongo-db-uri>
JWT_SECRET=<your-secret-key>
PORT=5000
```

Make sure you replace `<your-mongo-db-uri>` with your actual MongoDB URI (either from your local MongoDB instance or MongoDB Atlas), and `<your-secret-key>` with a secret key for JWT authentication.

### 4. Start the Backend

Run the following command to start the backend server:

```bash
npm run dev
```

Your backend server should now be running on `http://localhost:5000`.

## Frontend Setup

The frontend is built with **React** using **Vite** and **Tailwind CSS**.

### 1. Install Frontend Dependencies

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root of the frontend folder and configure the following:

```plaintext
VITE_API_URL=http://localhost:5000
```

This tells the frontend where to make API requests. Replace `http://localhost:5000` with the URL of your backend if it's hosted elsewhere.

### 3. Start the Frontend

Run the following command to start the frontend development server:

```bash
npm run dev
```

Your frontend application should now be running on `http://localhost:3000`.

## Running Both Together

1. Start the backend server by running `npm run dev` in the backend directory.
2. Start the frontend development server by running `npm run dev` in the frontend directory.
3. Open `http://localhost:3000` in your browser to view the frontend, which will communicate with the backend API running on `http://localhost:5000`.

## Build and Deploy

To build the app for production:

### 1. Backend

Run the following command in the backend directory:

```bash
npm run build
```

You can deploy the backend to a cloud service like **Heroku**, **AWS**, or **DigitalOcean**.

### 2. Frontend

Run the following command in the frontend directory:

```bash
npm run build
```

You can deploy the frontend to services like **Vercel**, **Netlify**, or **Firebase Hosting**.

---

### Notes:

- Ensure both the backend and frontend are using the same version of environment variables.
- If you're using MongoDB Atlas, make sure your IP address is whitelisted in the MongoDB Atlas dashboard.


Thanks for sharing your code! Here's how you can integrate it with the existing `README.md` for your API documentation.

---

Here’s a documentation template for the eCommerce backend API based on the provided code:

---

# **eCommerce API Documentation**

This API allows you to manage an eCommerce platform with functionality like user authentication, cart management, product management, and order management.

## **Base URL**
```
http://localhost:5000/api
```

## **Authentication**
- **JWT Token**: Used for secure authentication.
- **Login and Register**: Users must login or register to access protected routes.

---

## **User Routes**

### **POST /auth/register**
**Description**: Register a new user.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "userpassword",
  "name": "John Doe",
  "role": "user" // Can be 'admin' or 'user'
}
```

**Response**:
```json
{
  "message": "User registered successfully"
}
```

### **POST /auth/login**
**Description**: Login with email and password.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

**Response**:
```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

---

## **Cart Routes**

### **POST /cart**
**Description**: Add or update items in the user's cart.

**Request Body**:
```json
{
  "user": "user_id",
  "items": [
    {
      "product": "product_id",
      "quantity": 2
    }
  ]
}
```

**Response**:
```json
{
  "message": "Cart updated successfully",
  "cart": {
    "user": "user_id",
    "items": [
      {
        "product": "product_id",
        "quantity": 2,
        "price": 100,
        "totalItemPrice": 200
      }
    ],
    "totalPrice": 200
  }
}
```

### **GET /cart**
**Description**: Get the current user's cart.

**Response**:
```json
{
  "user": "user_id",
  "items": [
    {
      "product": {
        "name": "Product Name",
        "price": 100,
        "images": ["image_url"]
      },
      "quantity": 2,
      "totalItemPrice": 200
    }
  ],
  "totalPrice": 200
}
```

### **DELETE /cart/:productId**
**Description**: Remove an item from the cart.

**Response**:
```json
{
  "message": "Item removed successfully",
  "cart": {
    "user": "user_id",
    "items": [],
    "totalPrice": 0
  }
}
```

### **DELETE /cart/clear**
**Description**: Clear the entire cart.

**Response**:
```json
{
  "message": "Cart cleared successfully"
}
```

### **PUT /cart/:productId/increase**
**Description**: Increase the quantity of a product in the cart.

**Response**:
```json
{
  "message": "Quantity increased",
  "cart": {
    "user": "user_id",
    "items": [
      {
        "product": "product_id",
        "quantity": 3,
        "totalItemPrice": 300
      }
    ],
    "totalPrice": 300
  }
}
```

### **PUT /cart/:productId/decrease**
**Description**: Decrease the quantity of a product in the cart.

**Response**:
```json
{
  "message": "Quantity decreased",
  "cart": {
    "user": "user_id",
    "items": [
      {
        "product": "product_id",
        "quantity": 1,
        "totalItemPrice": 100
      }
    ],
    "totalPrice": 100
  }
}
```

---

## **Order Routes**

### **POST /orders**
**Description**: Place an order.

**Request Body**:
```json
{
  "items": [
    {
      "product": "product_id",
      "quantity": 2
    }
  ],
  "shippingAddress": "123 Street, City, Country",
  "paymentMethod": "credit_card"
}
```

**Response**:
```json
{
  "message": "Order placed successfully",
  "order": {
    "user": "user_id",
    "items": [
      {
        "product": "product_id",
        "quantity": 2,
        "price": 100,
        "totalItemPrice": 200
      }
    ],
    "totalPrice": 200,
    "shippingAddress": "123 Street, City, Country",
    "paymentMethod": "credit_card",
    "status": "pending"
  }
}
```

### **GET /orders/my-orders**
**Description**: Get all orders of the currently logged-in user.

**Response**:
```json
{
  "orders": [
    {
      "orderId": "order_id",
      "status": "pending",
      "totalPrice": 200
    }
  ]
}
```

### **GET /orders**
**Description**: Get all orders (admin-only).

**Response**:
```json
{
  "orders": [
    {
      "orderId": "order_id",
      "status": "pending",
      "totalPrice": 200
    }
  ]
}
```

### **PUT /orders/:orderId/status**
**Description**: Update the order status (admin-only).

**Request Body**:
```json
{
  "status": "shipped"
}
```

**Response**:
```json
{
  "message": "Order status updated successfully",
  "order": {
    "orderId": "order_id",
    "status": "shipped"
  }
}
```

### **DELETE /orders/:orderId**
**Description**: Delete an order (admin-only).

**Response**:
```json
{
  "message": "Order deleted successfully"
}
```

---

## **Product Routes**

### **POST /products**
**Description**: Create a new product (admin-only).

**Request Body**:
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 100,
  "discountPrice": 80,
  "images": ["image_url"],
  "category": "category_name",
  "brand": "brand_name",
  "stock": 50
}
```

**Response**:
```json
{
  "message": "Product created successfully",
  "product": {
    "name": "Product Name",
    "price": 100
  }
}
```

### **GET /products**
**Description**: Get all products with optional filters for category, brand, and price range.

**Query Parameters**:
- `category`: Filter by product category.
- `brand`: Filter by product brand.
- `minPrice`: Minimum price filter.
- `maxPrice`: Maximum price filter.
- `page`: Page number (default: 1).
- `limit`: Number of products per page (default: 10).

**Response**:
```json
{
  "message": "Products fetched successfully",
  "products": [
    {
      "productId": "product_id",
      "name": "Product Name",
      "price": 100
    }
  ]
}
```

### **GET /products/:id**
**Description**: Get details of a single product.

**Response**:
```json
{
  "message": "Product fetched successfully",
  "product": {
    "name": "Product Name",
    "price": 100,
    "description": "Product description",
    "images": ["image_url"]
  }
}
```

### **PUT /products/:id**
**Description**: Update product details (admin-only).

**Request Body**:
```json
{
  "price": 120,
  "stock": 60
}
```

**Response**:
```json
{
  "message": "Product updated successfully",
  "product": {
    "name": "Product Name",
    "price": 120
  }
}
```

### **DELETE /products/:id**
**Description**: Delete a product (admin-only).

**Response**:
```json
{
  "message": "Product deleted successfully"
}
```

---

## **Middleware**

### **authMiddleware**
Checks if the request is authenticated by validating the JWT token.

### **authorizeMiddleware**
Ensures that the authenticated user has the correct role (`admin` or `user`) to access the resource.

---

## **Error Handling**
The API returns the following types of errors:
- **400 Bad Request**: Invalid request parameters.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Unexpected server error.


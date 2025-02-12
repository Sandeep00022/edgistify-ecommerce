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

---



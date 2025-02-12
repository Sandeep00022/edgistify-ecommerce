import mongoose from "mongoose";

// Connect to MongoDB

const connectDb = () => {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => console.log(err));
};

export default connectDb;

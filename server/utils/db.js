import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    mongoose
      .connect(
        process.env.MONGO_URI
      )
      .then(() => console.log("connected..."))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
     setTimeout(connectDB, 3000);
  }
};

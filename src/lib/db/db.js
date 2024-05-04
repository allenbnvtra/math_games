import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

const dbConnect = async () => {
  mongoose
    .connect(uri)
    .then(() => console.log("Connected to the database!"))
    .catch((err) =>
      console.log(`Getting an error from DB connection.. ERROR: ${err.message}`)
    );
};

export default dbConnect;

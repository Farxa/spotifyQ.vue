import mongoose from "mongoose";
import User from "../models/User";

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://Farxa:DiYZyodmOy3tj6Gk@cluster0.cms0x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    } as mongoose.ConnectOptions
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

export { User }; // Export the user schema

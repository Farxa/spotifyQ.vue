import mongoose from "mongoose";
import User from "../models/User";

export function connectToDatabase() {
  mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost/spotifyQ")
    .then((x) => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
      );
    })
    .catch((err) => {
      console.error("Error connecting to mongo: ", err);
    });
}

export { User };

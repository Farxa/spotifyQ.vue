import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  avatar: string;
  spotifyAccessToken?: string;
  spotifyRefreshToken?: string;
  // Add more fields as per your requirements
}

const UserSchema: Schema = new Schema({
  name: String,
  avatar: String,
  //   spotifyAccessToken: String,
  //   spotifyRefreshToken: String,
  //   playlists: [],
});

export default mongoose.model<IUser>("User", UserSchema);

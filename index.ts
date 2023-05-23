import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as SpotifyStrategy } from "passport-spotify";
import { User } from "./db/index";
import authRoutes from "./routes/auth";
import routes from "./routes/routes";
import dotenv from "dotenv";
import { connectToDatabase } from "./db/index";

// Set up Express app
const app: express.Application = express();

dotenv.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "hush",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Spotify authentication
passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID || "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
      callbackURL: process.env.SPOTIFY_REDIRECT_URI || "",
    },
    async (
      accessToken: string,
      refreshToken: string,
      expires_in: number,
      profile: any,
      done: any
    ) => {
      try {
        // Here, you can implement your own logic to handle authentication and user profile

        // Assuming you have a User model, you can check if the user already exists in your database
        const existingUser = await User.findOne({ spotifyId: profile.id });

        if (existingUser) {
          // If the user already exists, update the access token and refresh token
          existingUser.spotifyAccessToken = accessToken;
          existingUser.spotifyRefreshToken = refreshToken;
          await existingUser.save();

          // Return the existing user
          return done(null, existingUser);
        }

        // If the user does not exist, create a new user and save the access token and refresh token
        const newUser = new User({
          spotifyId: profile.id,
          spotifyAccessToken: accessToken,
          spotifyRefreshToken: refreshToken,
          // Additional user data can be saved here
        });
        await newUser.save();

        // Return the new user
        return done(null, newUser);
      } catch (error) {
        // Handle any errors that occur during authentication or user profile handling
        return done(error, false);
      }
    }
  )
);

// Connect to MongoDB
connectToDatabase();

// Use the routes from the separate file
app.use("/auth", authRoutes);

app.use("/", routes);

// Start the server
app.listen(3000 as number, () => {
  console.log("Server listening on port 3000");
});

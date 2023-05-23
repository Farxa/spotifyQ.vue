import express from "express";
import passport from "passport";

const router = express.Router();

// Authentication route for Spotify
router.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-private", "user-read-email"],
  })
);

// Callback route for Spotify authentication
router.get(
  "/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/login" }),
  (req, res) => {
    // Redirect to the desired page after successful authentication
    res.redirect("/");
  }
);

export default router;

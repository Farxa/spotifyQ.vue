import express from "express";
import { User } from "../db/index";

const router = express.Router();

// Example route for creating a new user
router.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    // Create a new user using the User model
    const newUser = new User({
      name,
      email,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Return the saved user as the response
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Example route for retrieving all users
router.get("/users", async (req, res) => {
  try {
    // Fetch all users from the database using the User model
    const users = await User.find();

    // Return the users as the response
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;

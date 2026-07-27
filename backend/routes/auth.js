const express = require("express");

const router = express.Router();


const {
    registerUser,
    loginUser,
    getUsers,
    deleteUser
} = require("../controllers/authController");



// Register
router.post("/register", registerUser);



// Login
router.post("/login", loginUser);



// Get all users (Admin)
router.get("/users", getUsers);



// Delete user (Admin)
router.delete("/users/:id", deleteUser);



module.exports = router;
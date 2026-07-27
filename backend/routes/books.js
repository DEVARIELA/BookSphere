console.log("BOOKS ROUTE LOADED");

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");


const {
    getBooks,
    getAllBooks,
    createBook,
    updateBook,
    deleteBook
} = require("../controllers/bookController");



// JWT PROTECTED ROUTES

// User - own books
router.get("/", authMiddleware, getBooks);


// Admin - all books
router.get("/admin/all", authMiddleware, getAllBooks);


router.post("/", authMiddleware, createBook);

router.put("/:id", authMiddleware, updateBook);

router.delete("/:id", authMiddleware, deleteBook);



module.exports = router;
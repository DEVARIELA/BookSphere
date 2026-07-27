const express = require("express");

const router = express.Router();


const {
    adminAssistantQuery
} = require("../controllers/adminAssistantController");



console.log("ADMIN ASSISTANT ROUTE LOADED");



// ADMIN HARRY ROUTE

router.post("/", adminAssistantQuery);



module.exports = router;
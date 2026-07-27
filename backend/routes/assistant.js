// ==========================
// HARRY AI ASSISTANT ROUTE
// ==========================


const express = require("express");

const router = express.Router();



console.log("ASSISTANT ROUTE LOADED");



const {
    assistantQuery
} = require("../controllers/assistantController");




// POST /api/assistant

router.post("/", assistantQuery);



module.exports = router;
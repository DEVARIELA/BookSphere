const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// FRONTEND FILES
const frontendPath = path.join(__dirname, "..");

console.log("Serving frontend from:", frontendPath);

app.use(express.static(frontendPath));


// ROUTES

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
const assistantRoutes = require("./routes/assistant");
const adminAssistantRoutes = require("./routes/adminAssistant");



app.use("/api/auth", authRoutes);

app.use("/api/books", bookRoutes);

app.use("/api/assistant", assistantRoutes);

app.use("/api/admin-assistant", adminAssistantRoutes);



// Home page

app.get("/", (req,res)=>{

    res.sendFile(
        path.join(frontendPath,"index.html")
    );

});



// API test

app.get("/api",(req,res)=>{

    res.json({

        message:"BookSphere API working 🚀"

    });

});



// SERVER

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

});
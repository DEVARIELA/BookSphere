const jwt = require("jsonwebtoken");


const authMiddleware = (req,res,next)=>{


    const authHeader = req.headers.authorization;


    if(!authHeader){

        return res.status(401).json({
            message:"No token provided"
        });

    }


    const token = authHeader.split(" ")[1];


    try{

        console.log("TOKEN RECEIVED:", token);
        console.log("JWT SECRET:", process.env.JWT_SECRET);


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        console.log("DECODED USER:", decoded);


        req.user = decoded;


        next();



    }catch(error){


        console.log("JWT ERROR:", error.message);


        return res.status(401).json({
            message:"Invalid token"
        });


    }

};


module.exports = authMiddleware;
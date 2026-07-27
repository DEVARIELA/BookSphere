const harryService = require("../services/harryService");



const assistantQuery = async(req,res)=>{


    try{


        const {message,user_id}=req.body;



        const reply = await harryService(
            message,
            user_id
        );



        res.json({

            reply

        });



    }catch(error){


        console.error(error);



        res.status(500).json({

            error:error.message

        });



    }


};



module.exports = {
    assistantQuery
};
const adminHarryService = require("../services/adminHarryService");


// ==========================
// ADMIN HARRY CONTROLLER
// ==========================


const adminAssistantQuery = async (req, res) => {


    try {


        const { message, user_id } = req.body;



        if(!message){


            return res.status(400).json({

                reply:
                "Please ask me something 🤖"

            });


        }





        const reply = await adminHarryService(
            message,
            user_id
        );



        res.json({

            reply: reply

        });



    } catch(error){


        console.error(
            "Admin Harry Error:",
            error
        );



        res.status(500).json({

            reply:
            "Sorry, I cannot access admin data right now 🤖"

        });


    }


};





module.exports = {

    adminAssistantQuery

};
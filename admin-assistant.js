// ==========================
// ADMIN HARRY FRONTEND
// ==========================


console.log("ADMIN HARRY FRONTEND WORKING");



document.addEventListener("DOMContentLoaded", () => {



    const button = document.getElementById("adminHarryButton");

    const chat = document.getElementById("adminHarryChat");

    const close = document.getElementById("closeAdminHarry");

    const sendButton = document.getElementById("sendAdminHarry");

    const input = document.getElementById("adminHarryInput");

    const messages = document.getElementById("adminHarryMessages");




    // Kontroll

    console.log(button);
    console.log(chat);




    // Hap Chat

    if(button){

        button.addEventListener("click",()=>{

            chat.style.display="flex";

        });

    }





    // Mbyll Chat

    if(close){

        close.addEventListener("click",()=>{

            chat.style.display="none";

        });

    }







    // Dërgo mesazh

    async function sendMessage(){



        const message = input.value.trim();



        if(!message){

            return;

        }





        // Shfaq mesazhin e adminit

        messages.innerHTML += `

        <div class="harry-user-message">

            ${message}

        </div>

        `;




        input.value="";





        try{



            const response = await fetch(
                "https://booksphere-m7ex.onrender.com/api/admin-assistant",
                {

                    method:"POST",

                    headers:{

                        "Content-Type":"application/json"

                    },


                    body:JSON.stringify({

                        message:message

                    })

                }

            );





            const data = await response.json();





            messages.innerHTML += `

            <div class="harry-ai-message">

                ${data.reply}

            </div>

            `;





        }

        catch(error){


            console.error(
                "Admin Harry Error:",
                error
            );



            messages.innerHTML += `

            <div class="harry-ai-message">

                ❌ Sorry, Admin Harry is not available right now.

            </div>

            `;


        }





        // Scroll poshtë

        messages.scrollTop = messages.scrollHeight;



    }







    // Button send

    if(sendButton){


        sendButton.addEventListener(
            "click",
            sendMessage
        );


    }







    // Enter key

    if(input){


        input.addEventListener(
            "keypress",
            (e)=>{


                if(e.key==="Enter"){

                    sendMessage();

                }


            }
        );


    }







    // Suggestions buttons


    const suggestions = document.querySelectorAll(
        "#adminHarryChat .harry-suggestions button"
    );



    suggestions.forEach(button=>{


        button.addEventListener("click",()=>{


            input.value = button.dataset.question;


            sendMessage();


        });


    });




});
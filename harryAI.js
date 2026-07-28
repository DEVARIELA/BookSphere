// ==========================
// HARRY AI ASSISTANT
// ==========================


async function askHarry(message) {

    try {

        const user = JSON.parse(
            localStorage.getItem("user")
        );


        const token = localStorage.getItem("token");


        const response = await fetch(
            "https://booksphere-m7ex.onrender.com/api/assistant",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization":
                    `Bearer ${token}`

                },


                body: JSON.stringify({

                    message: message,

                    user_id: user.id

                })

            }
        );


        const data = await response.json();


        return data.reply;


    } catch(error) {


        console.error(error);


        return "Sorry, I cannot connect to my library database right now 🤖";


    }

}







document.addEventListener("DOMContentLoaded", () => {


    const harryButton = document.getElementById("harryButton");

    const harryChat = document.getElementById("harryChat");

    const closeHarry = document.getElementById("closeHarry");

    const sendHarry = document.getElementById("sendHarry");

    const harryInput = document.getElementById("harryInput");

    const harryMessages = document.getElementById("harryMessages");






    // OPEN CHAT

    harryButton.addEventListener("click",()=>{

        harryChat.style.display="flex";

    });






    // CLOSE CHAT

    closeHarry.addEventListener("click",()=>{

        harryChat.style.display="none";

    });







    // SEND BUTTON

    sendHarry.addEventListener("click",sendMessage);







    // ENTER KEY

    harryInput.addEventListener("keypress",(e)=>{


        if(e.key==="Enter"){

            sendMessage();

        }


    });







    // QUICK BUTTONS

    const suggestionButtons =
    document.querySelectorAll(".harry-suggestions button");



    suggestionButtons.forEach(button=>{


        button.addEventListener("click",()=>{


            const question =
            button.dataset.question;



            if(question){

                harryInput.value = question;

                sendMessage();

            }


        });


    });









    async function sendMessage(){



        const message =
        harryInput.value.trim();



        if(message==="") return;



        addMessage(message,"user");



        harryInput.value="";



        showTyping();




        const response =
        await getHarryResponse(message);




        removeTyping();



        addMessage(response,"ai");



    }









    function addMessage(message,type){



        const div =
        document.createElement("div");



        div.className =
        type==="user"
        ?
        "harry-user-message"
        :
        "harry-ai-message";



        div.innerHTML = message;



        harryMessages.appendChild(div);



        harryMessages.scrollTop =
        harryMessages.scrollHeight;



    }









    function showTyping(){


        const typing =
        document.createElement("div");


        typing.id="typing";


        typing.className="typing";


        typing.innerHTML=
        "<span>.</span><span>.</span><span>.</span>";



        harryMessages.appendChild(typing);


    }









    function removeTyping(){


        const typing =
        document.getElementById("typing");



        if(typing){

            typing.remove();

        }


    }









    async function getHarryResponse(message){



        const text =
        message.toLowerCase().trim();







        // GREETINGS

        const greetings=[

            "hi",
            "hello",
            "hey",
            "good morning",
            "good afternoon",
            "good evening"

        ];



        if(
            greetings.some(word =>
            text.includes(word))
        ){


            return `

            Hello! I'm Harry 🤖📚

            <br><br>

            Your BookSphere AI Assistant.

            <br>

            How can I help you today?

            `;


        }








        // DATABASE QUESTIONS

        const databaseQuestions=[


            "my books",

            "my library",

            "library summary",

            "how many books",

            "book count",

            "total books",

            "statistics",

            "stats",

            "reading progress",

            "favorite genre",

            "recommend",

            "recommendations",

            "suggest a book",
            
            "insights",

            "library insights",

            "analysis"


        ];





        if(
            databaseQuestions.some(word =>
            text.includes(word))
        ){


            return await askHarry(text);


        }







        return `

        I'm still learning 🤖📚

        <br><br>

        Try asking me about your library.

        `;



    }



});
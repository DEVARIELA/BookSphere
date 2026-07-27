const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");


registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;



    try {


        const response = await fetch(
    "https://booksphere-m7ex.onrender.com/api/auth/login",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    }
);



        const data = await response.json();



        if(response.ok){


            message.style.color = "green";

            message.textContent =
            "Registration successful! Redirecting...";


            setTimeout(()=>{

                window.location.href = "login.html";

            },1500);



        }else{


            message.style.color = "red";

            message.textContent =
            data.message;


        }



    } catch(error){


        console.error(error);


        message.style.color = "red";

        message.textContent =
        "Server connection error";


    }


});

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");


loginForm.addEventListener("submit", async (e)=>{


    e.preventDefault();



    const email =
    document.getElementById("email").value;


    const password =
    document.getElementById("password").value;



    try{


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


            message.style.color="green";

            message.textContent=
            "Login successful! Redirecting...";



            localStorage.setItem(
                "token",
                data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );



           setTimeout(()=>{

    if(data.user.role === "admin"){

        window.location.href = "admin-dashboard.html";

    } else {

        window.location.href = "dashboard.html";

    }

},1500);


        }else{


            message.style.color="red";

            message.textContent=data.message;


        }



    }catch(error){


        console.error(error);


        message.style.color="red";

        message.textContent=
        "Server connection error";


    }


});
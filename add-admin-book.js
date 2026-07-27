// BookSphere Admin Add Book JavaScript


const API_URL = "http://localhost:5000/api";


// Merr admin nga localStorage

const user = JSON.parse(
    localStorage.getItem("user")
);


// Kontroll Admin

if(!user || user.role !== "admin"){

    alert("Access denied. Admins only.");

    window.location.href = "login.html";

}


// Elements

const userSelect = document.getElementById("user_id");

const form = document.getElementById("bookForm");




// ============================
// LOAD USERS INTO SELECT
// ============================


async function loadUsers(){

    try{


        const response = await fetch(
            `${API_URL}/auth/users`,
            {

                headers:{

                    "Authorization":
                    `Bearer ${localStorage.getItem("token")}`

                }

            }
        );



        const users = await response.json();



        users.forEach(user=>{


            const option =
            document.createElement("option");



            option.value = user.id;



            option.textContent =
            `${user.name} (${user.email})`;



            userSelect.appendChild(option);


        });



    }
    catch(error){


        console.log(
            "Error loading users:",
            error
        );


    }


}





// ============================
// ADD BOOK
// ============================


form.addEventListener(
"submit",
async(e)=>{


    e.preventDefault();



    const book = {


        title:
        document.getElementById("title")
        .value
        .trim(),



        author:
        document.getElementById("author")
        .value
        .trim(),



        genre:
        document.getElementById("genre")
        .value,



        reading_status:
        document.getElementById("reading_status")
        .value,



        cover_url:
        document.getElementById("cover_url")
        .value
        .trim(),



        description:
        document.getElementById("description")
        .value
        .trim(),



        price:
        document.getElementById("price").value
        ?
        Number(
            document.getElementById("price").value
        )
        :
        null,



        user_id:
        document.getElementById("user_id")
        .value


    };





    if(!book.user_id){


        alert(
            "Please select a user"
        );


        return;


    }





    try{


        const response =
        await fetch(
            `${API_URL}/books`,
            {

                method:"POST",


                headers:{


                    "Content-Type":
                    "application/json",



                    "Authorization":
                    `Bearer ${localStorage.getItem("token")}`


                },


                body:
                JSON.stringify(book)


            }
        );





        if(response.ok){



            alert(
                "Book added successfully 📚"
            );



            window.location.href =
            "admin-dashboard.html";



        }
        else{


            const error =
            await response.json();



            alert(
                error.message ||
                "Failed to add book"
            );


        }




    }
    catch(error){



        console.log(
            "Add book error:",
            error
        );



        alert(
            "Server error"
        );


    }



});





// ============================
// START
// ============================


loadUsers();
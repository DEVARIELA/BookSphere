// BookSphere Library Management System
// Add Book JavaScript
const API_URL = "https://booksphere-m7ex.onrender.com/api";

// Merr user nga localStorage

const user = JSON.parse(
    localStorage.getItem("user")
);


// Kontrollon login

if (!user) {

    window.location.href = "login.html";

}



// Merr formën

const form = document.getElementById("bookForm");




// Submit form

form.addEventListener("submit", async (e) => {


    e.preventDefault();



    const book = {


        title:
        document.getElementById("title").value.trim(),



        author:
        document.getElementById("author").value.trim(),



        genre:
        document.getElementById("genre").value.trim(),



        reading_status:
        document.getElementById("reading_status").value,


cover_url:
document.getElementById("cover_url").value.trim() ||
"https://via.placeholder.com/300x450?text=No+Cover",


        description:
        document.getElementById("description").value.trim(),



        price:
        Number(
            document.getElementById("price").value
        ),



        user_id:
        user.id


    };





    // Validim

    if(
        !book.title ||
        !book.author ||
        !book.genre
    ){

        alert(
            "Please fill title, author and genre"
        );

        return;

    }






    try {



        const response = await fetch(

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


    if(user.role === "admin"){

        window.location.href =
        "admin-dashboard.html";

    } else {

        window.location.href =
        "dashboard.html";

    }


}




    }



    catch(error){



        console.error(
            error
        );



        alert(
            "Server error"
        );


    }



});
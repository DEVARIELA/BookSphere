// BookSphere Library Management System
// Edit Book JavaScript


const API_URL = "http://localhost:5000/api";


// Merr ID nga URL

const params = new URLSearchParams(
    window.location.search
);


const bookId = params.get("id");



const form = document.getElementById("editBookForm");



// Merr librin ekzistues

async function loadBook(){


    try{


        const response = await fetch(

            `${API_URL}/books`,

            {

                headers:{

                    "Authorization":
                    `Bearer ${localStorage.getItem("token")}`

                }

            }

        );



        const books = await response.json();



        const book = books.find(
            b => b.id == bookId
        );



        if(!book){


            alert("Book not found");


            window.location.href =
            "dashboard.html";


            return;


        }





        document.getElementById("title").value =
        book.title || "";



        document.getElementById("author").value =
        book.author || "";



        document.getElementById("genre").value =
        book.genre || "";



        document.getElementById("reading_status").value =
        book.reading_status || "reading";



        document.getElementById("cover_url").value =
        book.cover_url || "";



        document.getElementById("description").value =
        book.description || "";



        document.getElementById("price").value =
        book.price || "";



    }


    catch(error){


        console.error(error);


        alert("Error loading book");


    }


}







// Update Book

form.addEventListener("submit", async(e)=>{


    e.preventDefault();




    const updatedBook = {


        title:
        document.getElementById("title").value.trim(),



        author:
        document.getElementById("author").value.trim(),



        genre:
        document.getElementById("genre").value.trim(),



        reading_status:
        document.getElementById("reading_status").value,



        cover_url:
        document.getElementById("cover_url").value.trim(),



        description:
        document.getElementById("description").value.trim(),



        price:
        Number(
            document.getElementById("price").value
        )


    };






    try{


        const response = await fetch(

            `${API_URL}/books/${bookId}`,

            {

                method:"PUT",


                headers:{


                    "Content-Type":
                    "application/json",



                    "Authorization":
                    `Bearer ${localStorage.getItem("token")}`


                },


                body:
                JSON.stringify(updatedBook)


            }

        );






        if(response.ok){


            alert(
                "Book updated successfully 📚"
            );



            window.location.href =
            "dashboard.html";


        }


        else{


            const error =
            await response.json();



            alert(
                error.message ||
                "Error updating book"
            );


        }


    }



    catch(error){


        console.error(error);


        alert(
            "Server error"
        );


    }



});






// Start

loadBook();
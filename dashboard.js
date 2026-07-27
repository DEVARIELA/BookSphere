// BookSphere Library Management System
// Dashboard JavaScript


const API_URL = "http://localhost:5000/api";


// Merr user nga localStorage

const user = JSON.parse(
    localStorage.getItem("user")
);


// Kontrollon login

if (!user) {

    window.location.href = "login.html";

}



// HTML Elements

const welcomeMessage = document.getElementById("welcomeMessage");
const booksContainer = document.getElementById("booksContainer");
const logoutBtn = document.getElementById("logoutBtn");
const addBookBtn = document.getElementById("addBookBtn");

let allBooks = [];




// Welcome message

if (welcomeMessage && user) {

    welcomeMessage.innerHTML =
    `
    Welcome back, ${user.name} 📚
    `;

}





// Logout

if(logoutBtn){

    logoutBtn.addEventListener("click",()=>{


        localStorage.removeItem("user");
        localStorage.removeItem("token");


        window.location.href="login.html";


    });

}





// Load books from API

async function loadBooks(){


    try{


        const token = localStorage.getItem("token");


        const response = await fetch(

            `${API_URL}/books`,

            {

                method:"GET",

                headers:{

                    "Content-Type":"application/json",

                    "Authorization":
                    `Bearer ${token}`

                }

            }

        );



        if(!response.ok){


            const errorText =
            await response.text();


            console.log(errorText);


            throw new Error(
                "Failed to fetch books"
            );


        }




        const books = await response.json();



        allBooks = books;



        displayBooks(allBooks);



    }


    catch(error){


        console.error(
            "Error loading books:",
            error
        );



        if(booksContainer){

            booksContainer.innerHTML =
            `
            <div class="empty">

            <h3>
            Cannot load books ❌
            </h3>


            <p>
            Check backend server.
            </p>


            </div>
            `;

        }


    }


}






// Search and Filter Books

function filterBooks(){


    const searchValue =
    document
    .getElementById("searchInput")
    .value
    .toLowerCase()
    .trim();



    const selectedGenre =
    document
    .getElementById("genreFilter")
    .value;



    const selectedStatus =
    document
    .getElementById("statusFilter")
    .value;




    const filteredBooks = allBooks.filter(book=>{


        const title =
        (book.title || "")
        .toLowerCase();



        const author =
        (book.author || "")
        .toLowerCase();



        const genre =
        (book.genre || "")
        .toLowerCase();




        const matchesSearch =

        title.includes(searchValue)

        ||

        author.includes(searchValue)

        ||

        genre.includes(searchValue);





        const matchesGenre =

        selectedGenre === ""

        ||

        book.genre === selectedGenre;





        const matchesStatus =

        selectedStatus === ""

        ||

        book.reading_status === selectedStatus;





        return (

            matchesSearch

            &&

            matchesGenre

            &&

            matchesStatus

        );


    });



    displayBooks(filteredBooks);



}








// Display books

function displayBooks(books){


    if(!books || books.length === 0){


        booksContainer.innerHTML =
        `

        <div class="empty">

        <h3>
        No books found 📖
        </h3>


        <p>
        Add your first book!
        </p>


        </div>

        `;


        return;

    }





    booksContainer.innerHTML = "";





    books.forEach(book=>{


        const card = document.createElement("div");



        card.classList.add(
            "book-card"
        );



        card.innerHTML =


        `

        <img 
        src="${book.cover_url || 'bookspherelogo.png'}"
        alt="${book.title}"
        >



        <h3>
        ${book.title}
        </h3>



        <p>
        Author: ${book.author}
        </p>



        <p>
        Genre: ${book.genre}
        </p>



        <p>
        Status: ${book.reading_status}
        </p>



        <p>
        Price: ${book.price || 0} €
        </p>




        <button onclick="editBook('${book.id}')">
        Edit ✏️
        </button>




        <button onclick="deleteBook('${book.id}')">
        Delete 🗑️
        </button>



        `;



        booksContainer.appendChild(card);



    });



}








// Add Book Button

if(addBookBtn){


    addBookBtn.addEventListener(
        "click",
        ()=>{


            window.location.href =
            "add-book.html";


        }
    );


}








// Delete Book

async function deleteBook(id){


    const answer = confirm(
        "Are you sure you want to delete this book?"
    );



    if(!answer)
        return;




    try{


        const response = await fetch(

            `${API_URL}/books/${id}`,

            {

                method:"DELETE",

                headers:{

                    "Authorization":
                    `Bearer ${localStorage.getItem("token")}`

                }


            }

        );





        if(response.ok){


            alert(
                "Book deleted successfully 📚"
            );



            loadBooks();


        }


        else{


            alert(
                "Failed to delete book"
            );


        }



    }


    catch(error){


        console.error(error);


    }



}








// Edit Book

function editBook(id){


    window.location.href =
    `edit-book.html?id=${id}`;


}








// Filter Events


document
.getElementById("searchInput")
.addEventListener(
    "input",
    filterBooks
);



document
.getElementById("genreFilter")
.addEventListener(
    "change",
    filterBooks
);



document
.getElementById("statusFilter")
.addEventListener(
    "change",
    filterBooks
);








// Start dashboard

loadBooks();
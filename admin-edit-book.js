const API_URL = "http://localhost:5000/api";


const user = JSON.parse(
    localStorage.getItem("user")
);


if(!user || user.role !== "admin"){

    window.location.href="login.html";

}



const params = new URLSearchParams(
    window.location.search
);


const bookId = params.get("id");



const form = document.getElementById(
    "editBookForm"
);




// GET BOOK DATA

async function loadBook(){


    const response = await fetch(
        `${API_URL}/books/admin/all`,
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



    if(book){


        document.getElementById("title").value =
        book.title;


        document.getElementById("author").value =
        book.author;


        document.getElementById("genre").value =
        book.genre;


        document.getElementById("reading_status").value =
        book.reading_status;


        document.getElementById("cover_url").value =
        book.cover_url || "";


        document.getElementById("description").value =
        book.description || "";


        document.getElementById("price").value =
        book.price || "";


    }


}





// UPDATE BOOK

form.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const updatedBook = {


title:
document.getElementById("title").value,


author:
document.getElementById("author").value,


genre:
document.getElementById("genre").value,


reading_status:
document.getElementById("reading_status").value,


cover_url:
document.getElementById("cover_url").value,


description:
document.getElementById("description").value,


price:
document.getElementById("price").value || null



};



const response = await fetch(

`${API_URL}/books/${bookId}`,

{

method:"PUT",

headers:{

"Content-Type":"application/json",

"Authorization":
`Bearer ${localStorage.getItem("token")}`

},

body:JSON.stringify(updatedBook)

}

);



if(response.ok){


alert(
"Book updated successfully 📚"
);


window.location.href =
"admin-dashboard.html";


}


});



loadBook();
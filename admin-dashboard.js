// BookSphere Admin Dashboard JavaScript


const API_URL = "https://booksphere-m7ex.onrender.com/api";


// Merr user-in nga localStorage

const user = JSON.parse(
    localStorage.getItem("user")
);


// Kontroll Admin

if (!user || user.role !== "admin") {

    alert("Access denied. Admins only.");

    window.location.href = "login.html";

}



// Elements

const welcomeMessage =
document.getElementById("welcomeMessage");


const booksTableBody =
document.getElementById("booksTableBody");


const usersTableBody =
document.getElementById("usersTableBody");


const totalBooks =
document.getElementById("totalBooks");


const totalUsers =
document.getElementById("totalUsers");


const totalAdmins =
document.getElementById("totalAdmins");


const logoutBtn =
document.getElementById("logoutBtn");





welcomeMessage.textContent =
`Welcome, ${user.name || "Admin"}`;





// ============================
// GO TO ADD BOOK
// ============================


function addBook(){

    window.location.href =
    "add-admin-book.html";

}





// ============================
// GO TO EDIT BOOK
// ============================


function editBook(id){

    window.location.href =
    `admin-edit-book.html?id=${id}`;

}






// ============================
// LOAD BOOKS
// ============================


async function loadBooks(){

    try {


        const token =
        localStorage.getItem("token");



        const response = await fetch(
            `${API_URL}/books/admin/all`,
            {

                headers:{

                    "Authorization":
                    `Bearer ${token}`

                }

            }
        );



        const books =
        await response.json();



        booksTableBody.innerHTML="";



        totalBooks.textContent =
        books.length;




        books.forEach(book=>{


            const row =
            document.createElement("tr");



            row.innerHTML = `


            <td>${book.title}</td>

            <td>${book.author}</td>

            <td>${book.genre}</td>

            <td>${book.reading_status}</td>

            <td>
            ${book.price || "No price"} €
            </td>


            <td>

                <button onclick="editBook('${book.id}')">

                    Edit

                </button>


                <button onclick="deleteBook('${book.id}')">

                    Delete

                </button>


            </td>


            `;



            booksTableBody.appendChild(row);



        });



    }
    catch(error){


        console.log(
            "Books loading error:",
            error
        );


    }


}







// ============================
// LOAD USERS
// ============================


async function loadUsers(){

try{
   const response =
await fetch(
    `${API_URL}/auth/users`,
    {
        headers:{
            "Authorization":
            `Bearer ${localStorage.getItem("token")}`
        }
    }
);


        const users =
        await response.json();



        usersTableBody.innerHTML="";



        totalUsers.textContent =
        users.length;



        let admins = 0;



        users.forEach(user=>{


            if(user.role==="admin"){

                admins++;

            }



            const row =
            document.createElement("tr");



            row.innerHTML = `


            <td>${user.name}</td>


            <td>${user.email}</td>


            <td>${user.role}</td>



            <td>


            <button onclick="deleteUser('${user.id}')">

                Delete

            </button>


            </td>



            `;



            usersTableBody.appendChild(row);



        });



        totalAdmins.textContent =
        admins;



    }
    catch(error){


        console.log(
            "Users loading error:",
            error
        );


    }


}







// ============================
// DELETE BOOK
// ============================


async function deleteBook(id){


    if(!confirm(
        "Delete this book?"
    )) return;



    try{


        const token =
        localStorage.getItem("token");



        const response =
        await fetch(
            `${API_URL}/books/${id}`,
            {


                method:"DELETE",


                headers:{


                    "Authorization":
                    `Bearer ${token}`


                }


            }
        );



        if(response.ok){


            alert(
                "Book deleted successfully"
            );


            loadBooks();


        }



    }
    catch(error){


        console.log(
            "Delete book error:",
            error
        );


    }


}







// ============================
// DELETE USER
// ============================


async function deleteUser(id){


    if(!confirm(
        "Delete this user?"
    )) return;



    try{


        const token =
        localStorage.getItem("token");



        const response =
        await fetch(
            `${API_URL}/auth/users/${id}`,
            {


                method:"DELETE",


                headers:{


                    "Authorization":
                    `Bearer ${token}`


                }


            }
        );



        if(response.ok){


            alert(
                "User deleted successfully"
            );


            loadUsers();


        }



    }
    catch(error){


        console.log(
            "Delete user error:",
            error
        );


    }


}








// ============================
// LOGOUT
// ============================


logoutBtn.addEventListener(
"click",
()=>{


    localStorage.removeItem(
        "user"
    );


    localStorage.removeItem(
        "token"
    );


    window.location.href =
    "login.html";


});







// ============================
// START DASHBOARD
// ============================


loadBooks();

loadUsers();
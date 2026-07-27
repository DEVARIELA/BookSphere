const supabase = require("../supabase");


// ==========================
// ADMIN HARRY SERVICE
// ==========================


async function adminHarryService(message){


    const text = message.toLowerCase().trim();



    // ==========================
    // TOTAL USERS
    // ==========================

    if(
        text.includes("users") ||
        text.includes("how many users") ||
        text.includes("total users")
    ){


        const {data,error} = await supabase
        .from("users")
        .select("id");


        if(error) throw error;



        return `

        👥 Total users in BookSphere:

        <br><br>

        ${data.length} users registered.

        `;


    }





    // ==========================
    // TOTAL BOOKS
    // ==========================


    if(
        text.includes("books") ||
        text.includes("how many books") ||
        text.includes("total books")
    ){


        const {data,error}=await supabase
        .from("books")
        .select("id");


        if(error) throw error;



        return `

        📚 Total books in the system:

        <br><br>

        ${data.length} books.

        `;


    }






    // ==========================
    // LIBRARY STATISTICS
    // ==========================


    if(
        text.includes("statistics") ||
        text.includes("stats") ||
        text.includes("overview")
    ){



        const {data,error}=await supabase
        .from("books")
        .select("reading_status");


        if(error) throw error;



        const total=data.length;


        const completed=data.filter(
            b=>b.reading_status==="completed"
        ).length;



        const reading=data.filter(
            b=>b.reading_status==="reading"
        ).length;



        return `

        📊 BookSphere Statistics

        <br><br>

        📚 Total books: ${total}

        <br>

        ✅ Completed: ${completed}

        <br>

        📖 Currently reading: ${reading}

        `;


    }







    // ==========================
    // MOST ACTIVE USER
    // ==========================


    if(
        text.includes("most books") ||
        text.includes("top user") ||
        text.includes("active user")
    ){



        const {data,error}=await supabase
        .from("books")
        .select("user_id");


        if(error) throw error;



        const users={};



        data.forEach(book=>{

            users[book.user_id]=
            (users[book.user_id] || 0)+1;

        });



        const topUser =
        Object.keys(users)
        .sort(
            (a,b)=>users[b]-users[a]
        )[0];



        return `

        🏆 Most active reader:

        <br><br>

        User ID: ${topUser}

        <br>

        Books added: ${users[topUser]}

        `;


    }







    // ==========================
    // DEFAULT
    // ==========================


    return `

    I'm Admin Harry 🤖

    <br><br>

    You can ask me:

    <br><br>

    👥 Total users

    <br>

    📚 Total books

    <br>

    📊 Statistics

    <br>

    🏆 Most active user

    `;


}



module.exports = adminHarryService;
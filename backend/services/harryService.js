const supabase = require("../supabase");


// ==========================
// HARRY AI SERVICE
// ==========================


async function harryService(message, user_id){


    const text = message.toLowerCase().trim();



    // GET USER BOOKS

    const {data: books, error} = await supabase
    .from("books")
    .select("*")
    .eq("user_id", user_id);



    if(error){

        throw error;

    }



    // ==========================
    // LIBRARY SUMMARY
    // ==========================


    if(
        text.includes("my library") ||
        text.includes("library summary") ||
        text.includes("how many books")
    ){


        const total = books.length;


        const completed = books.filter(
            book => book.reading_status === "completed"
        ).length;


        const reading = books.filter(
            book => book.reading_status === "reading"
        ).length;


        const want = books.filter(
            book => book.reading_status === "want_to_read"
        ).length;



        return `

        📚 You have ${total} books in your library.

        <br><br>

        ✅ Completed: ${completed}

        <br>

        📖 Reading: ${reading}

        <br>

        ⏳ Want to read: ${want}

        `;

    }





    // ==========================
    // READING STATISTICS
    // ==========================


    if(
        text.includes("statistics") ||
        text.includes("stats") ||
        text.includes("reading progress")
    ){


        const total = books.length;


        const completed = books.filter(
            book => book.reading_status === "completed"
        ).length;



        const progress = total > 0
        ? Math.round((completed / total) * 100)
        : 0;



        return `

        📊 Reading Statistics

        <br><br>

        Total books: ${total}

        <br>

        Completed: ${completed}

        <br>

        Progress: ${progress}%

        `;

    }





    // ==========================
    // FAVORITE GENRE
    // ==========================


    if(
        text.includes("favorite genre") ||
        text.includes("most read genre")
    ){


        const genres = {};


        books.forEach(book=>{

            if(book.genre){

                const genre =
                book.genre.trim().toLowerCase();


                genres[genre] =
                (genres[genre] || 0) + 1;

            }

        });



        const favorite = Object.keys(genres)

        .sort(
            (a,b)=>genres[b]-genres[a]
        )[0];



        return favorite

        ?

        `🎭 Your favorite genre is ${favorite}.`

        :

        "You don't have enough books yet.";

    }





    // ==========================
    // LIBRARY INSIGHTS
    // ==========================


    if(
        text.includes("insights") ||
        text.includes("library insights") ||
        text.includes("analysis")
    ){


        const total = books.length;


        const completed = books.filter(
            book => book.reading_status === "completed"
        ).length;


        const reading = books.filter(
            book => book.reading_status === "reading"
        ).length;


        const want = books.filter(
            book => book.reading_status === "want_to_read"
        ).length;



        const progress = total > 0
        ? Math.round((completed / total) * 100)
        : 0;



        const genres = {};


        books.forEach(book=>{

            if(book.genre){

                const genre =
                book.genre.trim().toLowerCase();


                genres[genre] =
                (genres[genre] || 0) + 1;

            }

        });



        const favoriteGenre = Object.keys(genres)

        .sort(
            (a,b)=>genres[b]-genres[a]
        )[0];



        let advice;


        if(progress >= 70){

            advice =
            "🌟 Great job! You are making excellent reading progress.";

        }
        else if(reading > completed){

            advice =
            "💡 Try finishing your current books before adding new ones.";

        }
        else{

            advice =
            "📚 Keep building your personal library.";

        }



        return `

        🧠 Harry's Library Insights

        <br><br>

        📚 Total books: ${total}

        <br>

        ✅ Completed: ${completed}

        <br>

        📖 Reading: ${reading}

        <br>

        ⏳ Want to read: ${want}

        <br><br>

        🎭 Favorite Genre: ${favoriteGenre || "No data"}

        <br>

        📈 Completion Rate: ${progress}%

        <br><br>

        ${advice}

        `;


    }





    // ==========================
    // RECOMMENDATIONS
    // ==========================


    if(
        text.includes("recommend") ||
        text.includes("suggest") ||
        text.includes("what should i read")
    ){


        if(books.length === 0){

            return `
            
            📚 Your library is empty.

            <br><br>

            Add books first and Harry will recommend something 🤖

            `;

        }



        const genres = {};



        books.forEach(book=>{

            if(book.genre){

                const genre =
                book.genre.trim().toLowerCase();


                genres[genre] =
                (genres[genre] || 0) + 1;

            }

        });



        const favoriteGenre = Object.keys(genres)

        .sort(
            (a,b)=>genres[b]-genres[a]
        )[0];




        const recommendations = {


            horror:[
                "It - Stephen King",
                "The Shining - Stephen King",
                "Dracula - Bram Stoker"
            ],


            fantasy:[
                "The Hobbit - J.R.R. Tolkien",
                "Harry Potter - J.K. Rowling",
                "The Lord of the Rings - J.R.R. Tolkien"
            ],


            fiction:[
                "1984 - George Orwell",
                "The Alchemist - Paulo Coelho",
                "The Little Prince - Antoine de Saint-Exupéry"
            ],


            romance:[
                "Pride and Prejudice - Jane Austen",
                "The Notebook - Nicholas Sparks",
                "Jane Eyre - Charlotte Brontë"
            ],


            mystery:[
                "Sherlock Holmes - Arthur Conan Doyle",
                "Gone Girl - Gillian Flynn",
                "The Da Vinci Code - Dan Brown"
            ],


            thriller:[
                "The Silent Patient - Alex Michaelides",
                "The Girl on the Train - Paula Hawkins",
                "Verity - Colleen Hoover"
            ],


            scifi:[
                "Dune - Frank Herbert",
                "The Martian - Andy Weir",
                "Foundation - Isaac Asimov"
            ],
selfhelp:[
    "Atomic Habits - James Clear",
    "The 7 Habits of Highly Effective People - Stephen Covey",
    "How to Win Friends and Influence People - Dale Carnegie"
],

        };



        const suggested =
        recommendations[favoriteGenre];



        if(suggested){


            return `

            ✨ Based on your reading habits:

            <br><br>

            🎭 Your favorite genre:
            ${favoriteGenre}

            <br><br>

            🤖 Harry recommends:

            <br><br>

            📚 ${suggested.join("<br>📚 ")}

            `;


        }



        return `

        ✨ Harry recommends exploring more books.

        <br><br>

        I noticed you enjoy:

        🎭 ${favoriteGenre || "different genres"}

        <br><br>

        Add more books and Harry will personalize recommendations better 🤖📚

        `;


    }





    // ==========================
    // DEFAULT
    // ==========================


    return `

    I'm still learning 🤖📚

    <br><br>

    Try asking:

    <br>

    📚 Library Summary

    <br>

    📊 Statistics

    <br>

    🧠 Library Insights

    <br>

    🎭 Favorite Genre

    <br>

    ✨ Recommendations

    `;


}



module.exports = harryService;
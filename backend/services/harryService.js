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

            genres[book.genre] =
            (genres[book.genre] || 0) + 1;

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

            genres[book.genre] =
            (genres[book.genre] || 0) + 1;

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


        const genres = {};


        books.forEach(book=>{

            genres[book.genre] =
            (genres[book.genre] || 0) + 1;

        });



        const favoriteGenre = Object.keys(genres)

        .sort(
            (a,b)=>genres[b]-genres[a]
        )[0]?.trim();



        const recommendations = {

            Horror:[
                "It",
                "The Shining",
                "Dracula"
            ],

            Fantasy:[
                "The Hobbit",
                "Harry Potter",
                "The Lord of the Rings"
            ],

            Fiction:[
                "1984",
                "The Alchemist",
                "The Little Prince"
            ]

        };



        const suggested =
        recommendations[favoriteGenre];



        if(suggested){


            return `

            ✨ Based on your reading habits:

            <br><br>

            🎭 You enjoy ${favoriteGenre} books.

            <br><br>

            Harry recommends:

            <br>

            📚 ${suggested.join("<br>📚 ")}

            `;

        }



        return "✨ Harry recommends exploring more books.";

    }





    // DEFAULT


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
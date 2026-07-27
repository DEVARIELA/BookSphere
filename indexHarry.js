// ==========================
// HARRY GUIDE - INDEX PAGE
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    const harryButton = document.getElementById("harryButton");
    const harryChat = document.getElementById("harryChat");
    const closeHarry = document.getElementById("closeHarry");
    const sendHarry = document.getElementById("sendHarry");
    const harryInput = document.getElementById("harryInput");
    const harryMessages = document.getElementById("harryMessages");



    // ==========================
    // OPEN / CLOSE
    // ==========================

    harryButton.addEventListener("click", () => {

        harryChat.style.display = "flex";

    });

    closeHarry.addEventListener("click", () => {

        harryChat.style.display = "none";

    });



    // ==========================
    // SEND
    // ==========================

    sendHarry.addEventListener("click", sendMessage);

    harryInput.addEventListener("keypress", (e) => {

        if (e.key === "Enter") {

            sendMessage();

        }

    });



    // ==========================
    // QUICK BUTTONS
    // ==========================

    const buttons = document.querySelectorAll(".harry-suggestions button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            harryInput.value = button.dataset.question;

            sendMessage();

        });

    });



    // ==========================
    // SEND MESSAGE
    // ==========================

    function sendMessage() {

        const message = harryInput.value.trim();

        if (message === "") return;

        addMessage(message, "user");

        harryInput.value = "";

        showTyping();

        setTimeout(() => {

            removeTyping();

            addMessage(getHarryResponse(message), "ai");

        }, 700);

    }



    // ==========================
    // ADD MESSAGE
    // ==========================

    function addMessage(message, type) {

        const div = document.createElement("div");

        div.className =

            type === "user"

            ? "harry-user-message"

            : "harry-ai-message";

        div.innerHTML = message;

        harryMessages.appendChild(div);

        harryMessages.scrollTop = harryMessages.scrollHeight;

    }



    // ==========================
    // TYPING
    // ==========================

    function showTyping() {

        const typing = document.createElement("div");

        typing.id = "typing";

        typing.className = "typing";

        typing.innerHTML =
            "<span>.</span><span>.</span><span>.</span>";

        harryMessages.appendChild(typing);

        harryMessages.scrollTop = harryMessages.scrollHeight;

    }



    function removeTyping() {

        const typing = document.getElementById("typing");

        if (typing) {

            typing.remove();

        }

    }



    // ==========================
    // HARRY RESPONSES
    // ==========================

    function getHarryResponse(message) {

        const text = message.toLowerCase().trim();



        // Greetings

        if (

            text.includes("hi") ||

            text.includes("hello") ||

            text.includes("hey") ||

            text.includes("good morning") ||

            text.includes("good afternoon") ||

            text.includes("good evening")

        ) {

            return `

            👋 Hello!

            <br><br>

            I'm Harry,

            BookSphere's AI Assistant.

            <br><br>

            Welcome to BookSphere!

            How can I help you today?

            `;

        }



        // About BookSphere

        if (

            text.includes("booksphere") ||

            text.includes("what is booksphere") ||

            text.includes("about booksphere")

        ) {

            return `

            📚 BookSphere is a Library Management System.

            <br><br>

            You can:

            <br>

            • Build your own digital library

            <br>

            • Organize books by genre

            <br>

            • Track your reading progress

            <br>

            • Receive personalized AI insights

            <br>

            • Discover new books

            `;

        }



        // Register

        if (

            text.includes("register") ||

            text.includes("sign up") ||

            text.includes("create account")

        ) {

            return `

            📝 Creating an account is simple.

            <br><br>

            Click the Register button,

            complete the form,

            and your personal library will be ready.

            `;

        }



        // Login

        if (

            text.includes("login") ||

            text.includes("log in") ||

            text.includes("sign in")

        ) {

            return `

            🔑 Already have an account?

            <br><br>

            Click Login

            and enter your email

            and password.

            `;

        }



        // Harry

        if (

            text.includes("who are you") ||

            text.includes("harry") ||

            text.includes("what can you do") ||

            text.includes("ai")

        ) {

            return `

            🤖 I'm Harry,

            your BookSphere AI Assistant.

            <br><br>

            After you log in,

            I can:

            <br>

            📚 Summarize your library

            <br>

            📊 Show reading statistics

            <br>

            🎭 Detect your favorite genre

            <br>

            ✨ Recommend books

            <br>

            🧠 Generate reading insights

            `;

        }



        // Features

        if (

            text.includes("features") ||

            text.includes("what can i do") ||

            text.includes("what does this app do")

        ) {

            return `

            🚀 BookSphere Features

            <br><br>

            📚 Personal Library

            <br>

            📖 Reading Tracker

            <br>

            🎭 Genre Management

            <br>

            🤖 Harry AI Assistant

            <br>

            📊 Reading Analytics

            `;

        }



        // Library questions

        if (

            text.includes("my books") ||

            text.includes("library summary") ||

            text.includes("statistics") ||

            text.includes("favorite genre") ||

            text.includes("recommend")

        ) {

            return `

            📚 I'd love to help with your personal library.

            <br><br>

            Please log in to your account first.

            <br><br>

            Then I'll be able to analyze your books,

            reading progress,

            favorite genres,

            recommendations,

            and library insights.

            `;

        }



        // Default

        return `

        🤖 I'm here to help!

        <br><br>

        Try asking me:

        <br>

        📚 What is BookSphere?

        <br>

        📝 How do I register?

        <br>

        🔑 How do I login?

        <br>

        🤖 Who are you?

        <br>

        🚀 What features are available?

        `;

    }

});
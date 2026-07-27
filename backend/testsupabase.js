require("dotenv").config();

const supabase = require("./supabase");


async function test(){

    const { data, error } = await supabase
        .from("users")
        .select("*");


    if(error){

        console.log(error.message);

    } else {

        console.log("Supabase connected 🚀");
        console.log(data);

    }

}


test();
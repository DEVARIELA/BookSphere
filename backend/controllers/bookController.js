const supabase = require("../supabase");


// GET ALL BOOKS

const getBooks = async (req, res) => {

    console.log("GET BOOKS WORKING");

    try {

        const userId = req.user.id;


        const { data, error } = await supabase
            .from("books")
            .select("*")
            .eq("user_id", userId);



        if(error){

            return res.status(400).json({
                message: error.message
            });

        }



        res.json(data);



    } catch(error){


        res.status(500).json({
            message: error.message
        });


    }

};



// GET ALL BOOKS FOR ADMIN

const getAllBooks = async (req,res)=>{

    try{

        const { data, error } = await supabase
            .from("books")
            .select("*");


        if(error){

            return res.status(400).json({
                message:error.message
            });

        }


        res.json(data);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

// CREATE BOOK
const createBook = async (req,res)=>{

    try{

        const {
            title,
            author,
            genre,
            reading_status,
            cover_url,
            description,
            price,
            user_id
        } = req.body;



        const { data, error } = await supabase
            .from("books")
            .insert([
                {
                    title,
                    author,
                    genre,
                    reading_status,
                    cover_url,
                    description,
                    price,
                    user_id
                }
            ])
            .select();



        if(error){

            return res.status(400).json({
                message:error.message
            });

        }


        res.status(201).json(data[0]);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};





// UPDATE BOOK
const updateBook = async(req,res)=>{

    try{

        const { id } = req.params;


        const { data, error } = await supabase
            .from("books")
            .update(req.body)
            .eq("id", id)
            .select();



        if(error){

            return res.status(400).json({
                message:error.message
            });

        }


        res.json(data[0]);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};






// DELETE BOOK
const deleteBook = async(req,res)=>{

    try{

        const { id } = req.params;


        const { error } = await supabase
            .from("books")
            .delete()
            .eq("id", id);



        if(error){

            return res.status(400).json({
                message:error.message
            });

        }


        res.json({
            message:"Book deleted successfully"
        });



    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};





module.exports = {

    getBooks,
    getAllBooks,
    createBook,
    updateBook,
    deleteBook

};
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const notesArr = [
    {

    }
];

app.get('*',(req,res)=>{
    // will serve the homepage
    res.sendFile(path.join(__dirname, "public/index.html"));
})

app.get('/notes',(req,res)=>{
    // will serve tables page
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

//Should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes',(req,res)=>{
    //table data route
    res.json(tablesArr);
})

//Should recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post('/api/notes',(req,res)=>{
    //recieve data object, check if space in restuarnt, push to appropriate array
    const newNote = req.body;
    if(notesArr.length<5){
        notesArr.push(newNote);
        res.send("newNote");
    } else {
        res.send("error");
    }
})

//Should recieve a query paramter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
// app.DELETE('/api/notes/:id',(req,res)=>{
//     //recieve data object, check if space in restuarnt, push to appropriate array
//     const customer = req.body;
//     if(tablesArr.length<5){
//         tablesArr.push(customer);
//         res.send("reserved");
//     } else {
//         waitlistArr.push(customer);
//         res.send("waitlist");
//     }
// })

app.listen(PORT,function(){
    console.log('server listening!');
})

//The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.
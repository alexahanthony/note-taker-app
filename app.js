const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const util = require("util");
const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);
//this sets up the port 
const PORT = process.env.PORT || 3000;
//calls to use express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//this calls the db.json file
var notesArr = require("./db.json");
console.log(notesArr)
//pulls up html when you type "/"
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "/public/index.html"));
})
//pulls up notes page when you type "/notes"
app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})
//retrieve notes from json
app.get('/api/notes',(req,res)=>{
    var notesArr = JSON.parse(fs.readFileSync("./db.json", "utf8"));
    res.json(notesArr);
})
//receives a new note to save on the post request body, add the note to the `db.json` file, and then return the new note to the client.
app.post('/api/notes',(req,res)=>{
    const newNote = req.body;
    if(notesArr.length<50){
        notesArr.push(newNote);
        writeToFile("./db.json", JSON.stringify(notesArr));
        res.send("newNote");
    } else {
        res.send("error");
    }
})

app.delete('/api/notes/:id',(req,res)=>{
    console.log(req.id)
        notesArr.splice(req.id,1);
        writeToFile("./db.json", JSON.stringify(notesArr));
        res.send("deleteNote");
})

app.listen(PORT,function(){
    console.log('server ' + PORT + ' is listening!');
})


const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const notesDB = require('./db/db.json');

function randomId(){
    return Math.floor(100000 + Math.random() * 900000);
}


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req,res)=>{
    res.json(notesDB);
})

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    
    if (!title || !text) {
        return res.status(400).json({ error: 'Title and text are required for a new note' });
    }

    const newNote = {
        title,
        text,
        id: randomId()
    };

    notesDB.push(newNote);

    fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notesDB), (err) => {
        if (err) {
            console.error(err);
        }

        console.log('New note has been stored and saved!');
        res.json(notesDB);
    });
});

app.delete('/api/notes', (req, res) =>{
    const noteId = req.params.id;
    const index = notesDB.findIndex(note => note.id === noteId);
    notesDB.splice(index, 1);
    fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notesDB), (err)=>{
        if(err){
            console.log(err);
        }
        req.json(notesDB);
    })
})


app.listen(PORT, () =>{
    console.log(`Listening in on port ${PORT}`);
})


const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/api/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) =>{
    fs.readFile(path.join)
})




app.listen(PORT, () =>{
    console.log(`Listening in on port ${PORT}`);
})


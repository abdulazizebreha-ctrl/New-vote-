const express = require('express');
const app = express();
const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

let candidates = [
    { name: "ዳጊ", votes: 897, photo: "https://i.imgur.com/dagi.jpg" },
    { name: "ፀጋዛ", votes: 899, photo: "https://i.imgur.com/tsega.jpg" },
    { name: "ቢኒ", votes: 921, photo: "https://i.imgur.com/bini.jpg" }
];
let voters = []; // ስም እና ስልክ ቁጥር የሚቀመጥበት

app.get('/api/data', (req, res) => res.json({ candidates, voters }));

app.post('/vote', (req, res) => {
    const { name, voterName, voterPhone } = req.body;
    const candidate = candidates.find(c => c.name === name);
    if (candidate) {
        candidate.votes++;
        voters.push({ voterName, voterPhone, votedFor: name });
    }
    res.redirect('/');
});

app.listen(3000, () => console.log('Server running...'));

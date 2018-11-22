const bodyParser = require('body-parser')
const express = require('express')
const app = express();
const db = require('./suquelize')
const User = require('./tables').User

app.use(bodyParser.json())
// This gets all user in table
app.get('/', function (req, res) {
    db.sync().then(() => {
        User.findAll().then((user) => {
            res.send(JSON.stringify(user))
        })
    })
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
    let body = req.body;
    db.sync().then(() => {
        User.upsert(body).then(() => {
            res.send("Done")
        })
    })
})

//Make server listen on localhost:3000
app.listen(3000, () => {
    console.log("Listening on port 3000")
});


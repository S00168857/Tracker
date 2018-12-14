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
        }, err => {
            res.status(404).send("Error in fetching geoLocation")
        })
    })
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
    console.log(req.body)
    let body = req.body;
    if (Object.keys(body).length === 0) {
        res.status(400).send(JSON.stringify({
            message: "Bad request! Body is empty"
        }))
    }
    else {
        db.sync().then(() => {
            User.upsert(body).then(() => {
                res.send("Done")
            }, err => {
                console.log(err)
                res.status(400).send("Bad request")
            })
        })
    }
})

//Make server listen on localhost:3000
app.listen(3000, () => {
    console.log("Listening on port 3000")
});

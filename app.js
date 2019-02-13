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

// url/getcoords/1/1/2018-12-30/2019-1-24
app.get('/getcoords/:userId/:deviceId/:startDate/:endDate', function (req, res) { //Requestng params
    let userId = req.params.userId
    let deviceId = req.params.deviceId
    let startDate = req.params.startDate
    let endDate = req.params.endDate

    //Ensuring theyre there
    if (userId !== undefined && deviceId !== undefined && startDate !== undefined && endDate !== undefined) {
        let query = `Call 3rdYearProject.Retrieve_Location_Data(${userId},${deviceId},'${startDate}','${endDate}');`
        //Call query
        //Execute
        //Error checks
        db.sync().then(() => {
            db.query(query).then(data => {
                res.send({
                    message: 'Location retrieved',
                    data: data
                })
            }, err => {
                res.status(400).send({
                    message: 'Error when querying.'
                })
            })
        }, err => {
            res.status(400).send({
                message: 'Something went wrong connecting to db.'
            })
        })
    }
    else {
        res.status(400).send({
            message: "Bad request! One of the properties is missing or empty!"
        })
    }
})

//Get devices
app.get('/getdevices/:userId', (req, res) => {
    let userId = req.params.userId

    if (userId !== undefined) {
        let query = `Call 3rdYearProject.Return_Device_Names(${userId});`

        db.sync().then(() => {
            db.query(query).then(data => {
                res.send({
                    message: 'Devices retrieved',
                    data: data
                })
            }, err => {
                res.status(400).send({
                    message: 'Error when querying.'
                })
            })
        }, err => {
            res.status(400).send({
                message: 'Something went wrong connecting to db.'
            })
        })
    }
    else {
        res.status(400).send({
            message: "Bad request! One of the properties is missing or empty!"
        })
    }
})

//Specify what params are needed for query
app.post('/user', (req, res) => {
    let user = req.body

    let necessaryProperties = [
        "UserID",
        "roleID",
        "FirstName",
        "LastName",
        "Address1",
        "Address2",
        "Address3",
        "county",
        "ContactNo",
        "email"
    ]

    //Check the request has all the params needed
    necessaryProperties.forEach(prop => {
        if (user[prop] === undefined) {
            res.status(400).send('Missing property')
        }
    })

    //create query (Sproc)
    db.sync().then(() => {
        let query = `call 3rdYearProject.Insert_User_Data(${user.UserID}, ${user.roleID}, '${user.FirstName}','${user.LastName}','${user.Address1}','${user.Address2}','${user.Address3}','${user.county}','${user.ContactNo}', '${user.email}');`
        db.query(query).then(data => {
            res.status(201).send({
                message: 'User added'
            })
        }, err => {
            res.status(400).send({
                message: 'Error with query',
                err
            })
        }, err => {
            res.status(400).send({
                message: 'Error with query',
                err
            })
        })
    })
})
//Make server listen on localhost:3000
app.listen(3000, () => {
    console.log("Listening on port 3000")
});


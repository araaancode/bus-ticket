const express = require("express")
const colors = require("express")

// load env vars
require("dotenv").config()

// connect to DB
require("./config/dbConfig")()

// app
const app = express()

// routes
const usersRoute=require("./routes/usersRoute")

// mdl
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// mount routes
app.get('/', function (req, res) {
    res.send('hello, world!')
})

app.use('/api/users',usersRoute)

// server 
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`);
})
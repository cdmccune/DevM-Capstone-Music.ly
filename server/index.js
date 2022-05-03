require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const{seed} = require('./seed')

app.use(express.json())
app.use(cors())

//Wipes and seeds the DB
 app.post('/seed', seed)

 //Post to create a new user
 //Get to log-in a user
 


 app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))
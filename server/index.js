require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const{seed} = require('./seed')
const{login, createAcc, getSongs} = require('./controller')

app.use(express.json())
app.use(cors())

//Wipes and seeds the DB
 app.post('/seed', seed)

 
//Login Page: login and create account functionality
 app.post('/login', login)
 app.post('/createAcc', createAcc)

//Songs Page: 
app.post(`/songs`, getSongs)


 app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))
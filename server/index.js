require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const{seed} = require('./seed')
const{login, createAcc, getSongs, usersSongs} = require('./controller')

app.use(express.json())
app.use(cors())

//Wipes and seeds the DB
 app.post('/seed', seed)

 
//Login Page: login and create account functionality
 app.post('/login', login)
 app.post('/createAcc', createAcc)

//Songs Page: 
//To get the songs
app.post(`/songs`, getSongs)
//To get the songs that are already in the users playlist
app.post('/songs/playlist', usersSongs)

 app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))
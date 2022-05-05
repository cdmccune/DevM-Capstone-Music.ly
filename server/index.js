require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const{seed} = require('./seed')
const{login, createAcc, getSongs, deleteSong, addSong, getPlaylist, createPlaylist} = require('./controller')

app.use(express.json())
app.use(cors())

//Wipes and seeds the DB
 app.post('/seed', seed)

 
//Login Page: 
//login and create account functionality
 app.post('/login', login)
 app.post('/createAcc', createAcc)

//Songs Page: 
//To get the songs from the search and the users playlist
app.get(`/songs`, getSongs)

//To add and delete songs from your playlist
app.delete("/songs", deleteSong)
app.post("/songs", addSong)


//Playlist Page:
//To get the songs in the users playlist and name of the playlist
app.get('/playlist', getPlaylist)
app.post(`/playlist`, createPlaylist)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))
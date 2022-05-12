require('dotenv').config()
const express = require("express")
const path = require('path')
const app = express()
const cors = require('cors')
const {PORT} = process.env
const{seed} = require('./seed')
const{login, createAcc, getSongs, deleteSong, addSong, getPlaylist, createPlaylist, spotifyAuth, artistInfo} = require('./controller')

app.use(express.json())
app.use(cors())


// Sets up the endpoints for web hosting

app.get('/resetcss', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/reset.css'))
})
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/login/login.html'))
})
app.get("/loginjs", (req,res) => {
    res.sendFile(path.join(__dirname, '../client/login/login.js'))
})
app.get("/logincss", (req,res) => {
    res.sendFile(path.join(__dirname, '../client/login/login.css'))
})
app.get("/loginhtml", (req,res) => {
    res.sendFile(path.join(__dirname, '../client/login/login.html'))
})
app.get("/artistsjs", (req,res) => {
    res.sendFile(path.join(__dirname, '../client/artists/artists.js'))
})
app.get("/artistscss", (req,res) => {
    res.sendFile(path.join(__dirname, '../client/artists/artists.css'))
})
app.get("/artistshtml", (req,res) => {
    res.sendFile(path.join(__dirname, '../client/artists/artists.html'))
})
app.get("/playlistjs", (req,res) => {
    res.sendFile(path.join(__dirname, '../client/playlist/playlist.js'))
})
app.get("/playlistcss", (req,res) => {
    res.sendFile(path.join(__dirname, '../client/playlist/playlist.css'))
})
app.get("/playlisthtml", (req,res) => {
    res.sendFile(path.join(__dirname, '../client/playlist/playlist.html'))
})
app.get("/songscss", (req,res) => {
    res.sendFile(path.join(__dirname, '../client/songs/songs.css'))
})
app.get("/songsjs", (req,res) => {
    res.sendFile(path.join(__dirname, '../client/songs/songs.js'))
})
app.get("/songshtml", (req,res) => {
    res.sendFile(path.join(__dirname, '../client/songs/songs.html'))
})
app.get("/favicon", (req,res) => {
    res.sendFile(path.join(__dirname, '../favicon.ico'))
})






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


//Artist Page:

//To get authorization
app.get(`/authorization`,spotifyAuth)
app.get(`/artistinfo/`,artistInfo)


const port = PORT || 3000

app.listen(port, '0.0.0.0' , () => console.log(`up on port ${port}`))

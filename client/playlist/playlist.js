const baseURL = "http://localhost:4111"
const songsSection = document.getElementById("songslist")
const titleSection = document.getElementById("title")
const titleInput = document.getElementById("titleInput")
const container = document.getElementById("container")
const tableBody = document.querySelector("tbody")
const html = document.querySelector("html")

const main = document.querySelector("main")
let userid = window.localStorage.getItem("userID")
let userName = window.localStorage.getItem("first name")



// Displays songs that are in the users playlist on the page

const showPlaylist = () => {
    axios.get(`${baseURL}/playlist?userID=${userid}`)
     .then(res => {


        //Displays the name of the playlist if there is one, or gives an input box if not

        playlistName = res.data[1][0].playlist_name
        if (playlistName) {
            let div = document.createElement("div")
            titleSection.appendChild(div)
            div.innerHTML=`<h1>${playlistName}</h1>`
            div.style.height = "100%"
        } else {
            let form = document.createElement("form")
            titleInput.appendChild(form)
            form.innerHTML = `
                <label for="playlist">Welcome, ${userName}</label>
                <input type="text" id="playlist">
                <input type="submit" value="Initiate Playlist">
                `
            form.addEventListener('submit', createPlaylist)
            titleInput.style.visibility="visible"
            return
        }

        songs = res.data[0]
        

        //Displays that playlist is empty if the user has no songs in playlist

        if (songs.length == 0){
            let div = document.createElement("div")
            titleInput.appendChild(div)
            div.id= "noSongs"
            div.innerHTML = `<p>Your playlist is empty...</p>
            <p>Go to songs tab to add some!</p>
            `
            titleInput.style.visibility="visible"
            return
        }

        songs.forEach((song, index) => {

            
            //Displays the names of the songs

            let songEntry = document.createElement("td")
            let artistEntry = document.createElement("td")
            let genreEntry = document.createElement("td")
            let deleteEntry = document.createElement("td")

            let row = document.createElement("tr")
            tableBody.appendChild(row)
            
            songEntry.innerText = `${res.data[0][index].song_name}`
            artistEntry.innerText = `${res.data[0][index].artist_name}`
            genreEntry.innerText = `${res.data[0][index].genre}`

            deleteEntry.innerText = "Delete from playlist"
            deleteEntry.value = `${song.song_id}`
            deleteEntry.id = `${song.song_id}`
            deleteEntry.style.cursor = "pointer"
            deleteEntry.addEventListener('click', deleteSong)

            row.appendChild(songEntry)
            row.appendChild(artistEntry)
            row.appendChild(genreEntry)
            row.appendChild(deleteEntry)
         });

         container.style.visibility = "visible"
        
     })
    //  .catch((e)=> {window.location.reload()})
} 


//For deleting songs from your playlist

const deleteSong = (e) => {
    let songid =  e.target.value

    axios.delete(`${baseURL}/songs?song=${songid}&userID=${userid}`)
        .then(()=> {
            let remove = document.getElementById(`${songid}`)
            let parent = remove.parentNode
            let grandparent = parent.parentNode
            grandparent.removeChild(parent)
        })
}


//For creating and saving you playlist name

const createPlaylist = (e) => {
    e.preventDefault()

    let playlist = document.getElementById("playlist")

    if (!playlist.value) {
        alert("You must enter an Playlist name!")
        return
    } else if (playlist.value.includes("'")) {
        alert("You can't use apostraphies in your playlist name!")
        playlist.value=""
        return
    }

    let body = {
        userid: userid,
        playlistName: playlist.value
    }


    //Posts the title of the playlist and siplays no songs in playlist message

    axios.post(`${baseURL}/playlist`, body)
        .then(res => {
            let form = document.querySelector("form")
            titleInput.removeChild(form)
            // titleInput.innerHTML=""
            
            let h1 = document.createElement("h1")
            titleSection.appendChild(h1)
            h1.innerText=`${playlist.value}`


            let div = document.createElement("div")
            titleInput.appendChild(div)
            div.id= "noSongs"
            div.innerHTML = `<p>Your playlist is empty...</p>
            <p>Go to songs tab to add some!</p>
            `
        }).catch(err => {
            playlist.innerText = ""
            console.log(err)
            // alert(err)
        })
}


//brings back to logout screen if user doesn't have a userID in local storage

const notLoggedIn = () => {
    !window.localStorage.getItem("userID") ? window.location.href = `/` : showPlaylist()
}

notLoggedIn()


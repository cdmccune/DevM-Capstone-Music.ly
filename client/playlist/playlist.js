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

        } else {
        //    <label for="playlist">Initiate Your Playlist</label>
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
        
        if (songs.length == 0){
            let div = document.createElement("div")
            songsSection.appendChild(div)
            div.id= "noSongs"
            div.innerHTML = `
            <p>You don't have any songs yet! Go to the songs tab to add some to your playlist!</p>
            `
            return
        }

        songs.forEach((song, index) => {

            
            //Displays the names of the songs

            let songEntry = document.createElement("td")
            let artistEntry = document.createElement("td")
            let genreEntry = document.createElement("td")

            let row = document.createElement("tr")
            tableBody.appendChild(row)
            
            songEntry.innerText = `${res.data[0][index].song_name}`
            artistEntry.innerText = `${res.data[0][index].artist_name}`
            genreEntry.innerText = `${res.data[0][index].genre}`

            row.appendChild(songEntry)
            row.appendChild(artistEntry)
            row.appendChild(genreEntry)

            // let div = document.createElement("div")
            // songsSection.appendChild(div)
            // div.id= `div${song.song_id}`
            // div.innerHTML = `
            // <p>${res.data[0][index].song_name} ${res.data[0][index].artist_name} ${res.data[0][index].genre}</p>
            // `

            // //Creates a delete button for each song
            // let deleteBtn = document.createElement("button")
            // div.appendChild(deleteBtn)
            // deleteBtn.value = `${song.song_id}`
            // deleteBtn.id = `btn${song.song_id}`
            // deleteBtn.textContent = `Delete from playlist`
            // deleteBtn.addEventListener('click', deleteSong)


         });

         container.style.visibility = "visible"
        //  html.style.height = "fit-content"
        
     })
     .catch((e)=> {window.location.reload()})
} 

const deleteSong = (e) => {
    let songid =  e.target.value

    axios.delete(`${baseURL}/songs?song=${songid}&userID=${userid}`)
        .then(()=> {
            let button = document.getElementById(`btn${songid}`)
            let div = button.parentNode
            let parent = div.parentNode
            parent.removeChild(div)
        })
}

//For creating and saving you playlist name
const createPlaylist = (e) => {
    e.preventDefault()

    let playlist = document.getElementById("playlist")

    if (!playlist.value) {
        alert("You must enter an Playlist name!")
        return
    }

    let body = {
        userid: userid,
        playlistName: playlist.value
    }

    axios.post(`${baseURL}/playlist`, body)
        .then(res => {
            let form = document.querySelector("form")
            titleInput.removeChild(form)
            
            let h1 = document.createElement("h1")
            titleSection.appendChild(h1)
            h1.innerText=`${playlist.value}`


            //Gotta fix this part too
            // let div = document.createElement("div")
            // songsSection.appendChild(div)
            // div.id= "noSongs"
            // div.innerHTML = `
            // <p>You don't have any songs yet! Go to the songs tab to add some to your playlist!</p>
            // `
        })
}








showPlaylist()

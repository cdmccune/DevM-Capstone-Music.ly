const baseURL = "http://localhost:4111"
const container = document.getElementById("container")
const tableBody = document.querySelector("tbody")
const form = document.querySelector("form")
const section = document.querySelector("section")


//Gets all the songs that are currently on the users playlist

const getUserSongs = () => {
    let body = {
        userid: window.localStorage.getItem("userID")
    }

    let playlistsongs = []
    axios.post(`${baseURL}/songs/playlist`,body)
        .then(res => {
            res.data.forEach(song => {
                playlistsongs.push(song.song_id)
                window.localStorage.setItem("usersongs", playlistsongs)
            })
        })
}


//Print all the songs and "add" or "delete" button when the user does a search

const getSongs = (e)=>{
    e.preventDefault()


    //Deletes all the previous search results

    tableBody.innerHTML=""


    //Checks which checkboxes are checked, and unchecks them 

    const genres = document.getElementsByName("genre")
    let checkedgenres = []
    genres.forEach(checkbox => {
        if (checkbox.checked) {
            checkedgenres.push(checkbox.value)
        }
        checkbox.checked = false
    });

    
    let userid = window.localStorage.getItem("userID")
    let genreList =  checkedgenres


    //Does a post request with what songs are in those genres

    axios.get(`${baseURL}/songs?genre=${genreList}&userID=${userid}`)
        .then(res => {


            //Creates an array for all the songs in the users' playlist and all the songs in checked boxes

            let playlistSongs = []
            let songsArr = []
            for (i=0; i<res.data[1].length; i++){
                playlistSongs = playlistSongs.concat(res.data[1][i].song_id)
            }
            for (i=0; i<res.data[0].length; i++){
                songsArr = songsArr.concat(res.data[0][i].song_id)
            }


            // Loops over the songs from checked boxes and creates titles for each

            songsArr.forEach((song, index) => {

                let songEntry = document.createElement("td")
                let artistEntry = document.createElement("td")
                let genreEntry = document.createElement("td")
                let deleteEntry = document.createElement("td")
                let addEntry = document.createElement("td")

    
                let row = document.createElement("tr")
                tableBody.appendChild(row)
                
                songEntry.innerText = `${res.data[0][index].song_name}`
                artistEntry.innerText = `${res.data[0][index].artist_name}`
                genreEntry.innerText = `${res.data[0][index].genre}`

                row.appendChild(songEntry)
                row.appendChild(artistEntry)
                row.appendChild(genreEntry)


                // Adds an add or delete button depending on if the users' playlist contained the song or not

                if (playlistSongs.includes(song)) {
                    deleteEntry.innerText = "Delete from playlist"
                    deleteEntry.value = `${song}`
                    deleteEntry.id = `${song}`
                    deleteEntry.style.cursor = "pointer"
                    row.appendChild(deleteEntry)
                    deleteEntry.addEventListener('click', deleteSong)
                } else {
                    addEntry.innerText = "Add to playlist"
                    addEntry.value = `${song}`
                    addEntry.id = `${song}`
                    addEntry.style.cursor = "pointer"
                    row.appendChild(addEntry)
                    addEntry.addEventListener('click', addSong)
                }
            })
            container.style.visibility = "visible"
        })
}

const addSong = (e) => {
    
    let songid =  e.target.value
    let userid = window.localStorage.getItem("userID")

    axios.post(`${baseURL}/songs?song=${songid}&userID=${userid}`)
        .then(()=> {

            let entry = document.getElementById(`${songid}`)
            entry.removeEventListener("click", addSong)

            entry.innerText = "Delete from playlist"
            entry.addEventListener("click", deleteSong)
        })
}

const deleteSong = (e) => {
    
        let songid =  e.target.value
        let userid = window.localStorage.getItem("userID")

    axios.delete(`${baseURL}/songs?song=${songid}&userID=${userid}`)
        .then(()=> {
            let entry = document.getElementById(`${songid}`)
            entry.removeEventListener("click", deleteSong)

            entry.innerText = "Add to Playlist"
            entry.addEventListener("click", addSong)
        })

}


form.addEventListener("submit", getSongs)


//brings back to logout screen if user doesn't have a userID in local storage

const notLoggedIn = () => {
    if (!window.localStorage.getItem("userID")) {
        window.location.href = `/`
    }
}

notLoggedIn()
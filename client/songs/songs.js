const baseURL = "http://localhost:4111"

const form = document.querySelector("form")
const section = document.querySelector("section")


// console.log(genres)

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
        return "hi"
}

//Print all the songs and "add" or "delete" button when the user does a search
const getSongs = (e)=>{
    e.preventDefault()

    //Checks which checkboxes are checked
    const genres = document.getElementsByName("genre")
    let checkedgenres = []
    genres.forEach(checkbox => {
        if (checkbox.checked) {
            checkedgenres.push(checkbox.value)
        }
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
                let div = document.createElement("div")
                    section.appendChild(div)
                    div.id= `div${song}`
                    div.innerHTML = `
                    <p>${res.data[0][index].song_name} ${res.data[0][index].artist_name}</p>
                    `

                // Adds an add or delete button depending on if the users' playlist contained the song or not
                if (playlistSongs.includes(song)) {
                    let deleteBtn = document.createElement("button")
                    div.appendChild(deleteBtn)
                    deleteBtn.value = `${song}`
                    deleteBtn.id = `btn${song}`
                    deleteBtn.textContent = `Delete from playlist`
                    deleteBtn.addEventListener('click', deleteSong)
                } else {
                    let addBtn = document.createElement("button")
                    div.appendChild(addBtn)
                    addBtn.value = `${song}`
                    addBtn.id = `btn${song}`
                    addBtn.textContent = `Add from playlist`
                    addBtn.addEventListener('click', addSong)
                }
            })
        })
}

const addSong = (e) => {
    
    let songid =  e.target.value
    let userid = window.localStorage.getItem("userID")

    axios.post(`${baseURL}/songs?song=${songid}&userID=${userid}`)
        .then(()=> {
            let button = document.getElementById(`btn${songid}`)
            let div = button.parentNode
            div.removeChild(button)

            let deleteBtn = document.createElement("button")
            div.appendChild(deleteBtn)
            deleteBtn.value = `${songid}`
            deleteBtn.id = `btn${songid}`
            deleteBtn.textContent = `Delete from playlist`
            deleteBtn.addEventListener('click', deleteSong)
           
        })
}

const deleteSong = (e) => {
    
        let songid =  e.target.value
        let userid = window.localStorage.getItem("userID")

    axios.delete(`${baseURL}/songs?song=${songid}&userID=${userid}`)
        .then(()=> {
            let button = document.getElementById(`btn${songid}`)
            let div = button.parentNode
            div.removeChild(button)

            let addBtn = document.createElement("button")
            div.appendChild(addBtn)
            addBtn.value = `${songid}`
            addBtn.id = `btn${songid}`
            addBtn.textContent = `Add from playlist`
            addBtn.addEventListener('click', addSong)
        })

}


form.addEventListener("submit", getSongs)
// let usersSongs = getUserSongs()
// console.log(usersSongs)
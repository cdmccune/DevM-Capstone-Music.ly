const baseURL = "http://localhost:4111"
const songsSection = document.getElementById("songslist")
const titleSection = document.getElementById("title")
const main = document.querySelector("main")
let userid = window.localStorage.getItem("userID")






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
            let form = document.createElement("form")
            titleSection.appendChild(form)
            form.innerHTML = `
                <label for="playlist">It seems like you don't have a playlist name yet!</label>
                <input id="playlist" placeholder="Please enter your playlist here">
                <input type="submit" value="Save Playlist Name!">
                `
            form.addEventListener('submit', createPlaylist)
        }

        songs = res.data[0]
        
        if (songs.length == 0 && playlistName){
            let div = document.createElement("div")
            songsSection.appendChild(div)
            div.id= "noSongs"
            div.innerHTML = `
            <p>You don't have any songs yet! Go to the songs tab to add some to your playlist!</p>
            `
        }

        songs.forEach((song, index) => {

            
            //Displays the names of the songs
            let div = document.createElement("div")
            songsSection.appendChild(div)
            div.id= `div${song.song_id}`
            div.innerHTML = `
            <p>${res.data[0][index].song_name} ${res.data[0][index].artist_name} ${res.data[0][index].genre}</p>
            `

            //Creates a delete button for each song
            let deleteBtn = document.createElement("button")
            div.appendChild(deleteBtn)
            deleteBtn.value = `${song.song_id}`
            deleteBtn.id = `btn${song.song_id}`
            deleteBtn.textContent = `Delete from playlist`
            deleteBtn.addEventListener('click', deleteSong)

         });
        
     })
    //  .catch((e)=> {window.location.reload()})
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
            titleSection.removeChild(form)
            
            let div = document.createElement("div")
            titleSection.appendChild(div)
            div.innerHTML=`<h1>${playlist.value}</h1>`
        })

    if (songs.length == 0){
            let div = document.createElement("div")
            songsSection.appendChild(div)
            div.id= "noSongs"
            div.innerHTML = `
            <p>You don't have any songs yet! Go to the songs tab to add some to your playlist!</p>
            `
    }
}








showPlaylist()

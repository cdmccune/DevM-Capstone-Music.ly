const baseURL = "http://localhost:4111"
const userid=window.localStorage.getItem("userID")
let token = ""
let currentArtistName = ""
let currentArtistElement = null


 // "scripts": {
  //   "start": "node server/index.js"
  // },

const getAuth = () => {
    axios.get(`${baseURL}/authorization`)
    .then(res => {
        token = res.data
    })
}


const expand = () => {
    axios.get(`${baseURL}/artistinfo?artist=${currentArtistName}&token=${token}`)
        .then(res=> {

            let genreList = ''
            if (res.data.genres.length > 1 ){
                genreList = res.data.genres.slice(0, 3)
                genreList = genreList.join(", ")
            } else {
                genreList = res.data.genres
            }

            currentArtistElement.querySelectorAll("h2").innerText = ""
            currentArtistElement.querySelector(".popularity").innerText = `Popularity: ${res.data.popularity}`
            currentArtistElement.querySelector(".genres").innerText = `Genre(s): ${genreList}`
            currentArtistElement.querySelector(".followers").innerText = `Followers: ${res.data.followers}`
            currentArtistElement.querySelector("img").setAttribute("src", `${res.data.image}`)

            
        })

}



//brings back to logout screen if user doesn't have a userID in local storage

const notLoggedIn = () => {
    if (!window.localStorage.getItem("userID")) {
        window.location.href = `/`
    } else {
        axios.get(`${baseURL}/playlist?userID=${userid}`)
            .then(getAuth())
            // .catch((e)=> {window.location.reload()})
    }
}

notLoggedIn()


document.querySelectorAll(".collapsible").forEach(artist => {
    let toggler = document.createElement("div");
    toggler.className = "toggler";
    artist.appendChild(toggler);

    toggler.addEventListener("click", function(e) {
      currentArtistElement = artist
      artist.classList.toggle("open")
      currentArtistName = artist.id
      expand()
    }, false);
})

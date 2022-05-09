const baseURL = "http://localhost:4111"
const userid=window.localStorage.getItem("userID")
let token = ""



const getAuth = () => {
    axios.get(`${baseURL}/authorization`)
    .then(res => {
        token = res.data
    })
}


const expand = () => {
    console.log("hi")
}



//brings back to logout screen if user doesn't have a userID in local storage
const notLoggedIn = () => {
    if (!window.localStorage.getItem("userID")) {
        window.location.href = `../login/login.html`
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
      artist.classList.toggle("open")
      expand()
    }, false);
})

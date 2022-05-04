const baseURL = "http://localhost:4111"

const form = document.querySelector("form")
const section = document.querySelector("section")


// console.log(genres)

const getSongs = (e)=>{
    e.preventDefault()
    const genres = document.getElementsByName("genre")
    let checkedgenres = []
    genres.forEach(checkbox => {
        if (checkbox.checked) {
            // let div = document.createElement("div")
            // div.innerHTML = ``
            // section.appendChild(div)
            checkedgenres.push(checkbox.value)
        }
    });
    let body = {
        genres: checkedgenres
    }
    axios.post(`${baseURL}/songs`, body)
        .then(res => {
            console.log(res)
        })
}



form.addEventListener("submit", getSongs)
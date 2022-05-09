// require('dotenv').config()
// const{CONNECTION_STRING} = process.env
const logInForm = document.getElementById("logIn")
const createAccForm = document.getElementById("createAcc")

const liPassword = document.querySelector("#liPassword")
const liEmail = document.querySelector("#liEmail")

const caEmail = document.querySelector("#caEmail")
const caPassword = document.querySelector("#caPassword")
const firstName = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")

const baseURL = "http://localhost:4111"

const handleLogIn = (e) => {
    e.preventDefault()
   
    //Check if any fields are empty
    //Check if email has an @ symbol

    if (!liEmail.value) {
        alert("You must enter an Email!")
        return
    } else if (liEmail.value.indexOf("@")<0) {
        alert("Your Email must inlcude an @")
        return
    } else if (!liPassword.value) {
        alert("You must enter a password!")
        return
    }
    let body = {
        email: liEmail.value,
        password: liPassword.value
    }
 
    //Axios Post request to server to check if username and password match
    //Save the first name to the local storage 
    //Return by logging them in and moving them to the home if pass

    axios.post(`${baseURL}/login`, body)
        .then(res => {
            console.log(res.data)
            window.localStorage.setItem("first name", res.data['firstname'])
            window.localStorage.setItem("userID", res.data['userid'])
            window.location.href = `../playlist/playlist.html`
        })

}

const handleCreateAcc = (e) => {
    e.preventDefault()

    
    //Check if any fields are empty
    //Check if email has an @ symbol
    if (!caEmail.value) {
        alert("You must enter an Email!")
        return
    } else if (!caPassword.value) {
        alert("You must enter a password!")
        return
    } else if (caEmail.value.indexOf("@")<0) {
        alert("You must enter a valid email!")
        return
    } else if (!firstName.value) {
        alert("You must enter a first name!")
        return
    } else if (!lastName.value) {
        alert("You must enter a last name!")
        return
    }
    
    //Create a body object to send with the post req
    let body = {
        first: firstName.value,
        last: lastName.value,
        email: caEmail.value,
        password: caPassword.value
    }

    //Axios POST request to place the information into the DB
    //Save the first name to the local storage
    //Move them to the home screen
    axios.post(`${baseURL}/createAcc`, body)
        .then(res => {
            window.localStorage.setItem("first name", firstName.value)
            window.localStorage.setItem("userID", res.data['userid'])
            window.location.href = `../playlist/playlist.html`

        })
        .catch(err => {console.log('hi')})
}

logInForm.addEventListener("submit", handleLogIn)
createAccForm.addEventListener("submit", handleCreateAcc)

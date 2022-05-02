require('dotenv').config()
const{CONNECTION_STRING} = process.env
const logInForm = document.querySelector("#logIn")
const createAccForm = document.querySelector("#createAcc")

const liPassword = document.querySelector("#liPassword")
const liEmail = document.querySelector("#liEmail")

const caEmail = document.querySelector("#caEmail")
const caPassword = document.querySelector("#caPassword")
const firstName = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")

const handleLogIn = (e) => {
    e.preventDefault()
        if (liEmail < 1) {
            alert("You must enter an Email!")
            return
        } else if (liPassword < 1) {
            alert("You must enter a password!")
        }
   

    //Check if any fields are empty
    //Check if email has an @ symbol
    //Axios request to server to check if username and password match
    //Return by logging them in and moving them to the home if pass

}

const handleCreateAcc = (e) => {
    e.preventDefault()
    
}

logInForm.addEventListener("submit", handleLogIn)
createAccForm.addEventListener("submit",handleCreateAcc)
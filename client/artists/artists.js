








//brings back to logout screen if user doesn't have a userID in local storage
const notLoggedIn = () => {
    if (!window.localStorage.getItem("userID")) {
        window.location.href = `../login/login.html`
    }
}

notLoggedIn()
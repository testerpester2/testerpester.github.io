var env = {}
var page = {}
var body = document.body

env.debugMode = false

env.sounds = {}

// this one is from corru.js but changed to count firefox on linux as well
// not sure why they had the windows check in the first place??
function isFirefox() {
    return navigator.userAgent.indexOf('Firefox') !== -1;
}

if (isFirefox()) {
    env.platform = "firefox"
} else {
    env.platform = "chrome"
}

body.insertAdjacentHTML("afterbegin", `
    <div class="uicontainer"></div>    
`)

page.uicontainer = body.querySelector(".uicontainer")
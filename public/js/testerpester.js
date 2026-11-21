var env = {}
var body = document.body

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
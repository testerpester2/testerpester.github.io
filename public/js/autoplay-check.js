env.autoplayStatus

function checkAutoplayStatus() {
    if (env.platform == "firefox") {
        env.autoplayStatus = navigator.getAutoplayPolicy("mediaelement")

        if (env.autoplayStatus == "allowed") {killAutoplayWarning()}
    } else {
        body.insertAdjacentHTML("beforeend", `<audio style="display: none;" class="autoplaytester" src="/audio/meowmeow.ogg"></audio>`)
        let tester = document.querySelector('.autoplaytester')
        tester.volume = 0
        
        // this bit is just from the chrome 88 announcement post
        let promise = tester.play()

        if (promise !== undefined) {
            promise.then(_ => {
                env.autoplayStatus = "allowed"
                console.log("autoplay allowed yay")
                killAutoplayWarning()
            }).catch(error => {
                env.autoplayStatus = "not-allowed"
                console.log("autoplay not allowed")
            });
        } else {
            console.log("something fucked up happened")
        }

        // tester.remove()
    }
}

function killAutoplayWarning () {
    let autoplayContainer = document.body.querySelector(".autoplaycontainer")

    if (env.autoplayStatus != "allowed") {
        return
    }

    autoplayContainer.classList.add("fadeout")
    autoplayContainer.addEventListener("animationend", () => {
            autoplayContainer.remove()
    })

    body.removeEventListener("click", checkAutoplayStatus)
    body.removeEventListener("keypress", checkAutoplayStatus)
}

checkAutoplayStatus()

if (env.autoplayStatus != "allowed") {
    document.body.insertAdjacentHTML("beforeend", `

    <div class="autoplaycontainer">
        <div class="autoplaybox">
            <h2 class="autoplaytext">Click the button for audio!!</h2>
            <span class="autoplaytext">Your autoplay settings prevent this page from playing audio by default,,,,</span>
            <span class="autoplaytext">(there used to be none but lacy forced me to add something)</span>
            <button class="autoplaybutton">meow</button>
        </div>
    </div>
    
    `)
    
    document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="/css/autoplay-check.css">`)

    body.addEventListener("click", checkAutoplayStatus)
    body.addEventListener("keypress", checkAutoplayStatus)
}
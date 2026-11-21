var autoplayStatus = navigator.getAutoplayPolicy("mediaelement")

if (autoplayStatus != "allowed") {
    document.body.insertAdjacentHTML("beforeend", `

    <div class="autoplaycontainer">
        <div class="autoplaybox">
            <h2 class="autoplaytext">Click the button for audio!!</h2>
            <span class="autoplaytext">Your autoplay settings prevent this page from playing audio by default,,,,</span>
            <span class="autoplaytext">(okay actually theres no audio yet but thats just cause im too sleepy)</span>
            <button class="autoplaybutton">meow</button>
        </div>
    </div>
    
    `)
    
    document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="/css/autoplay-check.css">`)

    var autoplayContainer = document.body.querySelector(".autoplaycontainer")

    autoplayContainer.addEventListener("click", () => {
        autoplayStatus = navigator.getAutoplayPolicy("mediaelement")

        if (autoplayStatus != "allowed") {
            return
        }

        autoplayContainer.classList.add("fadeout")
        autoplayContainer.addEventListener("animationend", () => {
                autoplayContainer.remove()
            })
        })
}
var autoplayStatus = navigator.getAutoplayPolicy("mediaelement")

document.body.insertAdjacentHTML("beforeend", `

<div class="autoplaycontainer">
    <div class="autoplaybox">
        <h2 class="autoplaytext">Click the button for audio!!</h2>
        <span class="autoplaytext">Your autoplay settings prevent this page from playing audio by default,,,,</span>
    </div>
</div>

`)
document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="/css/subtitles.css">`)

page.uicontainer.insertAdjacentHTML("afterbegin", `
    <div class="subtitlescontainer"></div>    
`)

page.subtitleContainer = page.uicontainer.querySelector(".subtitlescontainer")

if (env.debugMode) {page.subtitleContainer.classList.add("debug")}

page.subsHistory = []
env.maxSubs = 5

function pushSubtitleBasic(str, length) {
    pushSubtitle({str: str, length: length, style: ""})
}

function pushSubtitle({str, length = "1s", style}) {
    if (page.subsHistory.length > env.maxSubs) {
        let subToKill = page.subsHistory.at(-1)
        page.subsHistory.pop()
        
        subToKill.classList.add("fadeout")
        subToKill.addEventListener("animationend", () => {
            subToKill.remove()
        })
    }

    let subtitle = document.createElement("span")

    subtitle.classList.add("subtitle")

    style.split(" ").forEach(classType => {
        if (classType != "") {subtitle.classList.add(classType)}
    })

    subtitle.innerText = str

    setTimeout(() => {
        subtitle.addEventListener("animationend", () => {
            subtitle.remove()
        })
        subtitle.classList.add("fadeout")
    }, length)

    page.subtitleContainer.insertAdjacentElement("afterbegin", subtitle)

    subtitle.classList.add("fadein")
    page.subsHistory.unshift(subtitle)
}

function purgeSubtitles() {
    page.subsHistory.forEach(sub => {
        sub.classList.add("fadeout")
        sub.addEventListener("animationend", () => {
            sub.remove()
        })
    })
}

function srtTimestampToMS(timestamp) {
    return timestamp.split(/\D/).reduce((acc, v, i) => acc += v*[3.6e6,6e4,1e3,1][i], 0)
}

function parseSrt(srt) {
    let subs = []
    let subsSrtFmt = []
    let srtArr = srt.split("\n").filter(line => line != "")

    for (let index = 0; index < srtArr.length; index += 3) {
	    let num = srtArr[index]
	    let timestamp = srtArr[index+1].split(" --> ")
	    let string = srtArr[index+2]
	    
        subsSrtFmt.push({"index": num, "timestamp": timestamp, "string": string})
    }

    subsSrtFmt.forEach(subtitle => {
        let newSub = {
            num: subtitle.index,
            startsAt: srtTimestampToMS(subtitle.timestamp[0]),
            endsAt: srtTimestampToMS(subtitle.timestamp[1]),
            string: subtitle.string,
            style: ""
        }

        subs.push(newSub)
    })

    return subs
}

function playSubtitles(subList) {
    subList.forEach(subtitle => {
        setTimeout(() => {
            pushSubtitle({str: subtitle.string, length: subtitle.endsAt - subtitle.startsAt + 5000, style: subtitle.style})
        },  subtitle.startsAt)
    })
}
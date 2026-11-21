env.sounds.meow = new Howl({
    src: ["/audio/meowmeow.ogg"],
    loop: true,
    autoplay: true,
    volume: 0.5,
})

var srt = `1
00:00:00,127 --> 00:00:02,180
meow meow meowmeow meow meow

2
00:00:02,392 --> 00:00:02,845
ahh!

3
00:00:02,881 --> 00:00:04,806
meowmeow meow meow meowmeow meow

4
00:00:05,266 --> 00:00:05,839
ahh!

5
00:00:05,888 --> 00:00:08,0012
meow meow meowmeow meow meow

6
00:00:08,174 --> 00:00:08,741
ahh!

7
00:00:08,755 --> 00:00:10,821
meowmeow meow  meowmeow meow

8
00:00:10,892 --> 00:00:11,515
ahh!

9
00:00:11,607 --> 00:00:13,659
meow meow meowmeow meow meow

10
00:00:13,872 --> 00:00:14,325
ahh!

11
00:00:14,360 --> 00:00:16,285
meowmeow meow meow meowmeow meow

12
00:00:16,745 --> 00:00:17,318
ahh!

13
00:00:17,368 --> 00:00:19,491
meow meow meowmeow meow meow

14
00:00:19,654 --> 00:00:20,220
ahh!

15
00:00:20,234 --> 00:00:22,301
meowmeow meow  meowmeow meow

16
00:00:22,372 --> 00:00:23,0030
ahh!

`

var parsedSrt = parseSrt(srt)
parsedSrt = parsedSrt.map(sub => {
    if (sub.string == "ahh!") {sub.style = "faraway"}
    return sub
})

env.sounds.meow.on("play", ()=>{playSubtitles(parsedSrt)})

if (env.debugMode) {document.querySelector(".binkycat").classList.add("debug")} 
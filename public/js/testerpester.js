var env = {}

env.sounds = {}

env.sounds.meow = new Howl({
    src: ["/audio/meowmeow.ogg"],
    loop: true,
    autoplay: true,
    volume: 0.5
})

env.sounds.meow.play()
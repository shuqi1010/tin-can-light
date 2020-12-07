let d = 0
let APressed = false
let num = 0
let mic = 0
let colorPicked = 0
let strip: neopixel.Strip = null
let temp = 0
pins.setPull(DigitalPin.P2, PinPullMode.PullNone)
pins.setPull(DigitalPin.P1, PinPullMode.PullNone)
strip = neopixel.create(DigitalPin.P2, 24, NeoPixelMode.RGB)
colorPicked = neopixel.rgb(randint(0, 255), randint(0, 255), randint(0, 255))
MovingRainbow()

// if A is pressed, start plotting graph on microbit board, call moveWithTone
basic.forever(function () {
    if (APressed == true) {
        led.plotBarGraph(
        pins.analogReadPin(AnalogPin.P1),
        500
        )
        MoveWithTone()
    }
})

// when A is pressed, set APressed to the opposite
input.onButtonPressed(Button.A, function () {
    if (APressed == true) {
        APressed = false
    } else {
        APressed = true
    }
})

// when button B is pressed, set colorPicked to a new color with random RGB values,
// call breathingLight function
input.onButtonPressed(Button.B, function () {
    colorPicked = neopixel.rgb(randint(0, 255), randint(0, 255), randint(0, 255))
    breathingLight()
})

// plot the LEDs ring matching the voice level
function MoveWithTone () {
    // read sound level from microphone at pin 1
    pins.analogSetPitchPin(AnalogPin.P1)
    // set the SoundThreshold
    pins.analogPitch(400, 0)
    // map the voice level to match 24 LEDs
    mic = Math.map(pins.analogReadPin(AnalogPin.P1), 0, 30, 0, 24)
    while (num < mic) {
        strip.setPixelColor(num, colorPicked)
        strip.setBrightness((40 - num) / 2)
        strip.show()
        num = num + 1
    }
    num = 0
    basic.pause(100)
    strip.clear()
}

// show the colorPicked with fade in and fade out
function breathingLight () {
    // fade in
    for (let a = 0; a <= 100; a++) {
        strip.setBrightness(a)
        strip.showColor(colorPicked)
        basic.pause(10)
    }
    // fade out
    for (let b = 0; b <= 100; b++) {
        strip.setBrightness(100 - b)
        strip.showColor(colorPicked)
        basic.pause(10)
    }
}

// rainbow light that rotates for a full circle and fades out
function MovingRainbow () {
    strip.setBrightness(50)
    strip.showRainbow(1, 360)
    strip.show()
    for (let index = 0; index < 24; index++) {
        strip.rotate(1)
        strip.setBrightness(50)
        strip.show()
        basic.pause(100)
    }
    d = 0
    for (let c = 0; c <= 50; c++) {
        strip.setBrightness(50 - c)
        strip.showRainbow(1, 360)
        basic.pause(10)
    }
    strip.clear()
    strip.show()
}

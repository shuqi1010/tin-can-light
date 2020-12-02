function MoveWithTone () {
    pins.analogSetPitchPin(AnalogPin.P1)
    pins.analogPitch(400, 0)
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
// set APressed to the opposite 
input.onButtonPressed(Button.A, function () {
    if (APressed == 0) {
        APressed = 1
    } else {
        APressed = 0
    }
})
//show the colorPicked with fade in and fade out
function breathingLight () {
    for (let a = 0; a <= 100; a++) {
        strip.setBrightness(a)
        strip.showColor(colorPicked)
        basic.pause(10)
    }
    for (let b = 0; b <= 100; b++) {
        strip.setBrightness(100 - b)
        strip.showColor(colorPicked)
        basic.pause(10)
    }
}
input.onButtonPressed(Button.B, function () {
    colorPicked = neopixel.rgb(randint(0, 255), randint(0, 255), randint(0, 255))
    breathingLight()
})
//Everytime the product is open, it starts with a cheerful rotating rainbow lights and fades out
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
let d = 0
let APressed = 0
let colorPicked = 0
let strip: neopixel.Strip = null
let num = 0
let mic = 0
let index23 = 0
let temp = 0
let index22 = 0
let list: number[] = []
pins.setPull(DigitalPin.P2, PinPullMode.PullNone)
pins.setPull(DigitalPin.P1, PinPullMode.PullNone)
mic = 0
num = 0
strip = neopixel.create(DigitalPin.P2, 24, NeoPixelMode.RGB)
let color = [neopixel.colors(NeoPixelColors.Red), neopixel.colors(NeoPixelColors.Orange), neopixel.colors(NeoPixelColors.Yellow), neopixel.colors(NeoPixelColors.Green), neopixel.colors(NeoPixelColors.Blue), neopixel.colors(NeoPixelColors.Indigo), neopixel.colors(NeoPixelColors.Violet), neopixel.colors(NeoPixelColors.Purple)]
colorPicked = color[0]
MovingRainbow()
basic.forever(function () {
    if (APressed == 1) {
        led.plotBarGraph(
        pins.analogReadPin(AnalogPin.P1),
        500
        )
        MoveWithTone()
    }
})

const connectButton = document.querySelector("#connect")
const playButton = document.querySelector("#play")
const stopButton = document.querySelector("#stop")

const connectionText = document.querySelector("#connection-text")
const roboxFace = document.querySelector("#robox-connection > img")

let currentPort = null
let currentWriter = null
let currentStreamClosed = null

const piVendorId = 0x2E8A

reconnectPico()




connectButton.addEventListener("click", async function(e){
    const port = navigator.serial.requestPort({ filters: [{ usbVendorId: piVendorId }] });
    port.then(async (connectedPort) => {
        connect(connectedPort)
    })
    .catch((error) => { //User did not select a port (or error connecting) show toolbar?

    })
})  
playButton.addEventListener("click", async function (e) {
    sendCode()
    playButton.style.display = 'none'
    stopButton.style.display = 'flex'
})  
stopButton.addEventListener("click", async function (e) {
    stopButton.style.display = 'none'
    restartPico()
})  






navigator.serial.addEventListener("connect", (e) => {
    let portInfo = e.target.getInfo()
    if (portInfo.usbVendorId === piVendorId) {
        connect(e.target)
    }
});
navigator.serial.addEventListener("disconnect", (e) => {
    let portInfo = e.target.getInfo()
    if (portInfo.usbVendorId === piVendorId) {
        disconnect()
    }
});


async function disconnect() {
    currentWriter.close();
    await currentStreamClosed;
    await currentPort.close()
    connectButton.style.display = "inline-block"
    playButton.style.display = "none"
    connectionText.textContent = "Disconnected"
    roboxFace.classList.remove("happy-face")
    roboxFace.classList.add("sad-face")
}
async function connect(port) {
    await port.open({ baudRate: 9600 });
    let textEncoder = new TextEncoderStream();
    currentPort = port
    currentWriter = textEncoder.writable.getWriter();
    currentStreamClosed = textEncoder.readable.pipeTo(port.writable);

    playButton.style.display = "inline-block"
    connectButton.style.display = "none"
    connectionText.textContent = "Connected"
    roboxFace.classList.add("happy-face")
    roboxFace.classList.remove("sad-face")
}
function reconnectPico() {
    navigator.serial.getPorts().then((ports) => {
        for (const port of ports) {
            let portInfo = port.getInfo()
            if (portInfo.usbVendorId === piVendorId) {
                connect(port)
                break;
            }
        }
    });
}

async function restartPico() {
    await currentWriter.write("x069\r")
}

async function sendCode(code) {
    let preAmble = `import select
import sys
import time

from machine import Pin, Timer

led = Pin(25, Pin.OUT)
timer = Timer()

def blink(timer):
    led.toggle()
timer.init(freq=2.5, mode=Timer.PERIODIC, callback=blink)`
    await currentWriter.write("x032BEGINUPLD\r" + preAmble + "\r\x04\r");
    await currentWriter.write("x021STARTPROG\r");
    console.log("SENT")
}

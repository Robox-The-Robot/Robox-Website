import * as Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python'


const connectButton = document.getElementById("connect")
const playButton = document.getElementById("play")
const stopButton = document.getElementById("stop")

const connectionText = document.getElementById("connection-text")
const roboxFace = document.querySelector("#robox-connection > img")

let currentPort = null
let currentWriter = null
let currentWriterStreamClosed = null

let currentReader
let currentReadableStreamClosed

let restarting = false

// Code to prefix the script. This includes libraries, etc.
const scriptDependency = `from machine import Pin, Timer
import time

ENV_LED = Pin(25, Pin.OUT)
print("test")

`

const piVendorId = 0x2E8A

reconnectPico()


async function connectToPort(e) {
    const port = navigator.serial.requestPort({ filters: [{ usbVendorId: piVendorId }] });
    port.then(async (connectedPort) => {
        connect(connectedPort)
    })
    .catch((error) => { //User did not select a port (or error connecting) show toolbar?
        // Show a toast/poup saying failed setup
        console.warn("Could not connect to the Robox device. Please try again.")
    })
}

connectButton.addEventListener("click", connectToPort);
document.getElementById("connection").addEventListener("click", connectToPort);

playButton.addEventListener("click", async function (e) {
    sendCode()
    playButton.style.display = 'none'
    stopButton.style.display = 'flex'
})  

stopButton.addEventListener("click", async function (e) {
    stopButton.style.display = 'none'
    playButton.style.display = "inline-block"
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
    currentReader.cancel()
    await currentReadableStreamClosed.catch(() => { /* Ignore the error */ });

    currentWriter.close();
    await currentWriterStreamClosed;
    await currentPort.close()
    if (restarting) {
        connectButton.style.display = "inline-block"
        playButton.style.display = "none"
        connectionText.textContent = "Disconnected"
        roboxFace.classList.remove("happy-face")
        roboxFace.classList.add("sad-face")
    }
}

async function connect(port) {
    await port.open({ baudRate: 9600 });
    let textEncoder = new TextEncoderStream();
    currentPort = port
    currentWriter = textEncoder.writable.getWriter();
    currentWriterStreamClosed = textEncoder.readable.pipeTo(port.writable);

    let textDecoder = new TextDecoderStream()
    currentReadableStreamClosed = currentPort.readable.pipeTo(textDecoder.writable);
    currentReader = textDecoder.readable.getReader();


    playButton.style.display = "inline-block"
    connectButton.style.display = "none"
    connectionText.textContent = "Connected"
    roboxFace.classList.add("happy-face")
    roboxFace.classList.remove("sad-face")
    if (restarting) restarting = false
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
const ws = Blockly.getMainWorkspace()
async function sendCode() {
    let code = pythonGenerator.workspaceToCode(ws);
    let finalCode = `${scriptDependency}\n${code}\nevent_begin()`
    console.log(finalCode)
    await currentWriter.write("x032BEGINUPLD\r" + finalCode + "\r\x04\r");
    await currentWriter.write("x021STARTPROG\r");
    readPico()
}
async function readPico() {
    while (true) {
        const { value, done } = await currentReader.read();
        if (done) {
            currentReader.releaseLock();
            break;
        }
        try {
            let parsedValue = JSON.parse(value)
            let type = parsedValue["type"]
            console.log(parsedValue, value)
            if (type === "error") {

            }
            else if (type === "console") {

            }
        }
        catch {
            console.log(value)
        }
        
        
    }
}
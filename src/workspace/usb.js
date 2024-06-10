import * as Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python'
import { createToast } from "../alerts"
import dayjs from 'dayjs';



const connectButton = document.getElementById("connect")
const playButton = document.getElementById("play")
const consoleButton = document.getElementById("terminal")
const stopButton = document.getElementById("stop")

const consoleTemplate = document.querySelector("#console-output-template")
const consoleElement = document.querySelector("#text-container")

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
import json
ENV_LED = Pin(25, Pin.OUT)
def generatePrint(typ, message):
    jsmessage = {"type": typ, "message": message}
    return json.dumps(jsmessage)

`

const piVendorId = 0x2E8A

reconnectPico()


async function connectToPort(e) {
    const port = navigator.serial.requestPort({ filters: [{ usbVendorId: piVendorId }] });
    port.then(async (connectedPort) => {
        connect(connectedPort)
    })
    .catch((error) => { //User did not select a port (or error connecting) show toolbar?
        createToast("Connection Error!", "Could not connect to the Robox device. Please try again.", "negative")
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
const terminalModal = document.querySelector("#print-modal")
consoleButton.addEventListener("click", async function (e) {
    terminalModal.showModal()
})  

const modals = document.querySelectorAll("dialog")
for (const modal of modals) {
    modal.addEventListener("click", (event) => {
        let rect = event.target.getBoundingClientRect();
        if (rect.left > event.clientX ||
            rect.right < event.clientX ||
            rect.top > event.clientY ||
            rect.bottom < event.clientY
        ) {
            modal.close();
        }
    })
}




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
    await currentReadableStreamClosed.catch((e) => { /* Ignore the error */ });

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
    consoleElement.replaceChildren()
    let code = pythonGenerator.workspaceToCode(ws);
    let finalCode = `${scriptDependency}\n${code}\nevent_begin()`
    console.log(finalCode)
    await currentWriter.write("x032BEGINUPLD\r" + finalCode + "\r\x04\r");
    await currentWriter.write("x021STARTPROG\r");
    readPico()
}
async function readPico() {
    //Sometimes messages from pico sends in halves so need to merge the values
    let error_string = ''
    usbloop: while (true) {
        const { value, done } = await currentReader.read();
        if (done) {
            currentReader.releaseLock();
            break;
        }
        let consoleMessages = []
        try {
            consoleMessages = [JSON.parse(value)]
            error_string = ''
        }
        catch (err) {
            error_string += value
            let rawErrorMessages = error_string.split("\n")
            let index = 0
            errorloop: for (const errorMessage of rawErrorMessages) {
                try {
                    consoleMessages.push(JSON.parse(errorMessage))
                }
                catch (err) {
                    break errorloop;
                }
                index += 1
            }
            if (index !== rawErrorMessages.length-1) {
                rawErrorMessages.splice(0, index+1)
            }
            error_string = rawErrorMessages.join("\n")

        }
        for (const message of consoleMessages) {
            let type = message["type"]
            if (type === "error") {
                createToast("Code Error!", message["message"], "negative")
            }
            else if (type === "console") {
                printToConsole(message["message"])

            }
        }
    }
}



function printToConsole(message) {
    const clone = consoleTemplate.content.cloneNode(true)
    const text = clone.querySelector(".console-text")
    text.textContent = message
    const time = clone.querySelector(".console-time")
    time.textContent = dayjs().format("HH:mm:ss")
    consoleElement.insertBefore(clone, consoleElement.firstChild)
}
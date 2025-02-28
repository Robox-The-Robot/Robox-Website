import * as Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python'
import { createToast } from "./alerts.js"
import dayjs from 'dayjs';



const connectButton = document.getElementById("connect")
const playButton = document.getElementById("play")
const consoleButton = document.getElementById("terminal")
const stopButton = document.getElementById("stop")
const consoleTemplate = document.querySelector("#console-output-template")
const consoleElement = document.querySelector("#print-modal")
const connectionHolder = document.getElementById("connection-managment")

const connectionText = document.getElementById("connection-text")
const roboxFace = document.querySelector("#robox-connection > img")


let currentPort = null
let currentWriter = null
let currentWriterStreamClosed = null

let currentReader
let currentReadableStreamClosed

let restarting = false

let firmware = false
// Code to prefix the script. This includes libraries, etc.
const scriptDependency = `
from roboxlib import Motors, LineSensors, UltrasonicSensor
from machine import Pin, Timer
import time
import json
ENV_LED = Pin(25, Pin.OUT)
line = LineSensors()
left_motor_polarity = right_motor_polarity = -1
ultrasonic = UltrasonicSensor()
def generatePrint(typ, message):
    jsmessage = {"type": typ, "message": message}
    return json.dumps(jsmessage)
motors = Motors()
motor_speed = 60
`

const piVendorId = 0x2e8a

reconnectPico()

async function connectToPort(e) {
    const port = navigator.serial.requestPort({ filters: [{ usbVendorId: piVendorId }] });
    port.then(async (device) => {
        connect(device)
    })
    .catch((error) => { //User did not select a port (or error connecting) show toolbar?
        if (error.name === "NotFoundError") return
        createToast("Connection Error!", "Could not connect to the Robox device. Please try again.", "negative")
    })
}

connectButton.addEventListener("click", connectToPort);

playButton.addEventListener("click", async function (e) {
    if (playButton.querySelector("svg.fa-play").style.display === "none") return createToast("Connecting to pico!", "We are connecting to the pico please wait!", "positive")
    if (!firmware) createToast("Connecting to pico!", "We are connecting to the pico please wait!", "negative")
    if (ws.getBlocksByType("event_begin").length === 0){
        return createToast("Missing Event!", "Please create a begin event!", "negative")
    } 
    if (ws.getBlocksByType("event_begin").length > 1) {
        return createToast("Too many events!", "Please keep to one event! We are adding support for more soon", "negative")
    }
    sendCode()
    connectionHolder.classList.remove(...connectionHolder.classList);
    connectionHolder.classList.add("playing")
    // playButton.style.display = 'none'
    // stopButton.style.display = 'flex' //Playing
})
stopButton.addEventListener("click", async function (e) {
    connectionHolder.classList.remove(...connectionHolder.classList);
    connectionHolder.classList.add("loading")
    restartPico()
})  
consoleButton.addEventListener("click", async function (e) {
    consoleElement.showModal()
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
        connect(e.target || e.port)
    }
});

navigator.serial.addEventListener("disconnect", (e) => {
    let portInfo = e.target.getInfo()
    if (portInfo.usbVendorId === piVendorId) {
        disconnect()
    }
});


async function disconnect() {
    const localPort = currentPort
    currentPort = undefined
    if (currentReader) {
        try {

            await currentReader.cancel()
            await currentReadableStreamClosed.catch((e) => { /* Ignore the error */ });
        }
        catch(err) {
            console.log(err)
        }
        
    }
    if (currentWriter) {
        currentWriter.close();
        await currentWriterStreamClosed;
    }
    if (localPort) {
        await localPort.close()
    }
    if (roboxFace.classList.contains("rotating-face")) roboxFace.classList.remove("rotating-face")
    if (!restarting) { //Disconnected
        connectionHolder.classList.remove(...connectionHolder.classList);
        connectionHolder.classList.add("disconnected")
    }
}

async function connect(port) {
    try {
        await port.open({ baudRate: 9600 });
    }
    catch(err) {
        return createToast("Port Error!", "We are unable to open the port on the pico! Try resetting it?", "negative")
    }
    let textEncoder = new TextEncoderStream();
    currentPort = port
    currentWriter = textEncoder.writable.getWriter();
    currentWriterStreamClosed = textEncoder.readable.pipeTo(port.writable);

    let textDecoder = new TextDecoderStream()
    currentReadableStreamClosed = currentPort.readable.pipeTo(textDecoder.writable);
    currentReader = textDecoder.readable.getReader();
    connectionHolder.classList.remove(...connectionHolder.classList);
    connectionHolder.classList.add("connected")
    if (restarting) {
        restarting = false
        
    }
    readPico()
    await currentWriter.write("x019FIRMCHECK\r")
    setTimeout(() => {
        warnPicoFirmware()
    }, "1000");
}
function warnPicoFirmware() {
    if (!firmware) {
        restartPico()
        //Show modal about issue
    }
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
    await currentWriter.write("\x03\n")
    await currentWriter.write("import machine\r")
    await currentWriter.write("machine.reset()\r")
    restarting = true
}
const ws = Blockly.getMainWorkspace()
async function sendCode() {
    consoleElement.replaceChildren()
    let code = pythonGenerator.workspaceToCode(ws);
    let finalCode = `${scriptDependency}\n${code}\nevent_begin()`
    await currentWriter.write("x032BEGINUPLD\r" + finalCode + "\rx04\r");
    await currentWriter.write("x021STARTPROG\r");
}
async function readPico() {
    //Sometimes messages from pico sends in halves so need to merge the values
    let error_string = ''
    try {
        usbloop: while (true) {
            const { value, done } = await currentReader.read()
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
                if (index !== rawErrorMessages.length - 1) {
                    rawErrorMessages.splice(0, index + 1)
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
                else if (type === "confirmation") {
                    firmware = true
                    if (playButton.querySelector("svg.fa-play").style.display === "none") {
                        playButton.querySelector("svg.fa-spinner").style.display = "none"
                        playButton.querySelector("svg.fa-play").style.display = "inline-block"
                    }
                    
                    warnPicoFirmware()
                }
            }
        }
    } catch(err) {
        console.warn(err)
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
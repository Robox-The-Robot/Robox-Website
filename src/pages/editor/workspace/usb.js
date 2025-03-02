import * as Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python'
import { createToast } from "./alerts.js"
import { pico } from "../usb.js";
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
//Code preamble
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
const ws = Blockly.getMainWorkspace()


pico.addEventListener("disconnect", (event) => {
    if (!event.detail.restarting) { //Disconnected
        connectionHolder.classList.remove(...connectionHolder.classList);
        connectionHolder.classList.add("disconnected")
    }
})
pico.addEventListener("connect", (event) => {
    connectionHolder.classList.remove(...connectionHolder.classList);
    connectionHolder.classList.add("connected") 
})
pico.addEventListener("console", (event) => {
    printToConsole(event.detail.message)
})
//TODO: add more toasts since currently there are 0



connectButton.addEventListener("click", () => pico.request());

playButton.addEventListener("click", async function (e) {
    if (playButton.querySelector("svg.fa-play").style.display === "none") return createToast("Connecting to pico!", "We are connecting to the pico please wait!", "positive")
    if (ws.getBlocksByType("event_begin").length === 0){
        return createToast("Missing Event!", "Please create a begin event!", "negative")
    } 
    if (ws.getBlocksByType("event_begin").length > 1) {
        return createToast("Too many events!", "Please keep to one event! We are adding support for more soon", "negative")
    }
    consoleElement.replaceChildren()
    let code = pythonGenerator.workspaceToCode(ws);
    let finalCode = `${scriptDependency}\n${code}\nevent_begin()`
    pico.sendCode(finalCode)
    connectionHolder.classList.remove(...connectionHolder.classList);
    connectionHolder.classList.add("playing")
})

stopButton.addEventListener("click", async function (e) {
    connectionHolder.classList.remove(...connectionHolder.classList);
    connectionHolder.classList.add("loading")
    pico.restart()
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

function printToConsole(message) {
    const clone = consoleTemplate.content.cloneNode(true)
    const text = clone.querySelector(".console-text")
    text.textContent = message
    const time = clone.querySelector(".console-time")
    time.textContent = dayjs().format("HH:mm:ss")
    consoleElement.insertBefore(clone, consoleElement.firstChild)
}
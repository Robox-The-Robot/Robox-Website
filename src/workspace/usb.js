const connectButton = document.querySelector("#connect")
const playButton = document.querySelector("#play")

const connectionText = document.querySelector("#connection-text")
const roboxFace = document.querySelector("#robox-connection > img")

let currentPort = null
let currentWriter = null
let currentStreamClosed = null

const piVendorId = 0x2E8A
connectButton.addEventListener("click", async function(e){
    const port = navigator.serial.requestPort({ filters: [{ usbVendorId: piVendorId }] });
    port.then(async (connectedPort) => {
        connect(connectedPort)
    })
    .catch((error) => { //User did not select a port (or error connecting) show toolbar?

    })
})  
navigator.serial.getPorts().then((ports) => {
    for (const port of ports) {
        let portInfo = port.getInfo()
        if (portInfo.usbVendorId === piVendorId) {
            connect(port)
            break;
        }
    }
});
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
    setTimeout(async () => {
        sendCode()
    }, "2000");
}

async function sendCode(code) {
    let preAmble = `from machine import Pin, Timer
led = Pin(25, Pin.OUT)
timer = Timer()

def blink(timer):
    led.toggle()
timer.init(freq=2.5, mode=Timer.PERIODIC, callback=blink)`
    console.log("WRITING")
    await currentWriter.write("x032BEGINUPLD\r" + preAmble + "\r\x04\r");
    await currentWriter.write("x021STARTPROG\r");
    currentWriter.close();
    await currentStreamClosed;
    setTimeout(async () => {
        console.log("stopping")
        const writer = currentPort.writable.getWriter();

        const data = new Uint8Array([0x04]); 
        await writer.write(data);
        writer.releaseLock();
    }, "5000");
}

import { createToast } from "../workspace/alerts.js"
const piVendorId = 0x2e8a

const UF2s = {
    "latest": "/public/robox.uf2",
    "dev": "/public/robox.uf2"
}

async function flashBootsel(UF2) {
    const dirHandle = await window.showDirectoryPicker();

    if (!dirHandle.name.includes("RPI-RP2")) {
        alert("Please select the RPI-RP2 drive!");
        return;
    }
    const fileHandle = await dirHandle.getFileHandle("robox.uf2", { create: true });
    const writable = await fileHandle.createWritable();

    await writable.write(this);
    await writable.close();
    alert("UF2 file successfully written! The Pico should reboot now.");
}
async function getUF2(UF2) {
    let UF2Address = UF2s[UF2]
    const response = await fetch("/public/robox.uf2");
    if (!response.ok) throw new Error("Failed to fetch UF2 file");
    const uf2Data = await response.arrayBuffer();
    return uf2Data
}
async function detectBOOTSEL() {
    let devices = await navigator.usb.getDevices()
    if (devices.length === 0) return false
    for (const device of devices) {
        if (device.productName === "RP2 Boot") { //Pico is in bootsel mode
            return true
        }
    }
    return false;
}
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
let currentPort, currentWriter, currentWriterStreamClosed, currentReadableStreamClosed, currentReader, bootinCall
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
    console.log("trying to make the pico bootsel")
    //Try to force the pico into REPL
    await currentWriter.write("\x03\n")
    await currentWriter.write("import machine\r")
    await currentWriter.write("machine.bootloader()\r")
    
    bootinCall = setInterval(() => {
        BOOTSELBoot()
    }, "1000");
}
async function BOOTSELBoot() {
    if (detectBOOTSEL()) {
        clearInterval(bootinCall);
        let chosenUf2 = await getUF2("latest")
        document.addEventListener("click", flashBootsel.bind(chosenUf2), false)
    }
    else {
        console.log("we no booted (retry time)")
        return
    }
}
//Stages of flashing 
// 1. Detecting if in bootsel
// 1-A. If not then put them in bootsel (either via instructions or automatic)
// 2. Choosing the UF2 (gonna be latest for now)
// 3. Actually flashing the pico
if (await detectBOOTSEL()) {
    let chosenUf2 = await getUF2("latest")
    document.addEventListener("click", flashBootsel.bind(chosenUf2), false)
}
else {
    console.log("we no booted (1st time)")
    document.addEventListener("click", connectToPort)
}

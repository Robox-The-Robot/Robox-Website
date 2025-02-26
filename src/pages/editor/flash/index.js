async function flashBootsel() {
    const dirHandle = await window.showDirectoryPicker();
    if (!dirHandle.name.includes("RPI-RP2")) {
        alert("Please select the RPI-RP2 drive!");
        return;
    }
    const response = await fetch("/public/robox.uf2");
    if (!response.ok) throw new Error("Failed to fetch UF2 file");
        
    const uf2Data = await response.arrayBuffer();
    const fileHandle = await dirHandle.getFileHandle("robox.uf2", { create: true });
    const writable = await fileHandle.createWritable();

    await writable.write(uf2Data);
    await writable.close();
    alert("UF2 file successfully written! The Pico should reboot now.");
}
function detectBOOTSEL() {
    navigator.usb.getDevices().then((devices) => {
        console.log(`Total devices: ${devices.length}`);
        console.log(devices)
    });
    navigator.serial.getPorts().then((ports) => {
        console.log(ports)
    });
}

//Stages of flashing 
// 1. Detecting if in bootsel
// 1-A. If not then put them in bootsel (either via instructions or automatic)
// 2. Choosing the UF2 (gonna be latest for now)
// 3. Actually flashing the pico

detectBOOTSEL()
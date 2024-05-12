import * as Blockly from 'blockly/core';
import "./index.css"
import "../colorvars.css"
import "./cross.png"

import { createProject, getProject, getProjects, renameProject, deleteProject, saveBlocklyCompressed } from '../blockly/serialization';

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from 'dayjs';

dayjs.extend(relativeTime)


// Upload tool
const uploadButton = document.getElementById("upload-project");
const fileInput = document.getElementById("fileInput");

uploadButton.addEventListener("click", () => { fileInput.click(); });
fileInput.addEventListener("change", (e) => {
    for (let file of e.target.files) {
        let reader = new FileReader();

        reader.addEventListener('load', (event) => {
            // TODO: SAVEBLOCKLYCOMPRESSED REQUIRES FILE VALIDATION
            saveBlocklyCompressed(file.name.replace(/\.[^/.]+$/, ""), event.target.result);
            window.location.reload(); // Refresh the project list instead of the page
        });
        reader.readAsText(file);
    }
});


const projectTemplate = document.getElementById("template-project")
const projectHolder = document.getElementById("project-holder")
let toolbarModal = document.getElementById("toolbar")
let projects = getProjects()
let projectIds = Object.keys(projects)
//If no projects may need to update this warning?
if (projectIds.length === 0) {
    let warning = document.createElement("h1")
    warning.textContent = "No projects created! Please create one"
    projectHolder.appendChild(warning)

} //if projects
else {
    let projectIndex = 0
    for (const projectId of projectIds) {
        let project = projects[projectId]
        let clone = projectTemplate.content.cloneNode(true)
        let title = clone.querySelector(".project-name")
        let time = clone.querySelector(".project-date")
        let projectTime = dayjs(project["time"])
        time.textContent = projectTime.fromNow()
        title.textContent = project["name"]
        clone.querySelector(".project").id = `${projectId}`

        projectHolder.appendChild(clone)

        projectIndex++

    }
    for (let item of document.querySelectorAll(".project")) {
        item.addEventListener("click", (e) => {
            let item = e.target
            let dots = item.closest(".dots")
            if (dots === null) { //Checking if it is the dialog being pressed or the dots
                if (!e.target.classList.contains("project")) item = item.parentNode
                window.location.assign(`${window.location.href}workspace/${item.id}`)
            }
            else { //it is the dots
                let boundingRect= dots.getBoundingClientRect()
                let x = boundingRect["x"]+(boundingRect["width"])/2
                let y = boundingRect["y"] + (boundingRect["height"]) / 2
                toolbarModal.style.left = `${x}px`
                toolbarModal.style.top = `${y}px`
                toolbarModal.setAttribute("target", item.closest(".project").id)
                toolbarModal.showModal()
            }
        })
    }
}
const createProjectButton = document.getElementById("create-project")
createProjectButton.addEventListener("click", function(e)  {
    let name = `untitled project`
    let id = createProject(name)
    window.location.assign(`${window.location.href}workspace/${id}`)
})



const editProjectModal = document.querySelector("#edit-project-dialog")
const editForm = editProjectModal.querySelector("form")
document.getElementById("edit-button").addEventListener("click", (event) => {
    let projectID = toolbarModal.getAttribute("target");
    let project = getProject(projectID)
    editProjectModal.setAttribute("target", projectID);
    editProjectModal.querySelector("#editPName").textContent = project["name"];
    editProjectModal.querySelector("#pname").value = project["name"];
    editProjectModal.showModal()
    editForm.addEventListener("submit", function(e) {
        let submitterType = e.submitter.getAttribute("baction")
        if (submitterType === "confirm") {
            let newName = document.getElementById("pname").value
            document.querySelector("#pname").value = ""
            let checkProject = getProject(newName)
            if (checkProject === false) { //good to go
                renameProject(projectID, newName)
                window.location.reload() // Refresh the project list instead of the page
                //Do something to confirm (thinking popup)
            }
            else { // Display the error somehow

            }
        }
    }, {once: true})
})
const deleteProjectModal = document.getElementById("delete-project-dialog")
const deleteButtons = deleteProjectModal.querySelector("#delete-buttons")
document.getElementById("delete-button").addEventListener("click", (event) => {
    let projectID = toolbarModal.getAttribute("target");
    let project = getProject(projectID)

    deleteProjectModal.setAttribute("target", toolbarModal.getAttribute("target"))
    deleteProjectModal.querySelector("#deletePName").textContent = project["name"];
    deleteProjectModal.showModal()
    deleteButtons.addEventListener("click", function (e) {
        if (e.target.nodeName === "DIV") return
        if (e.target.id === "confirm-delete") {
            deleteProject(projectID);
            window.location.reload() // Refresh the project list instead of the page
        }
        else {
            deleteProjectModal.close()
        }
        deleteButtons.removeEventListener("click", this)
    })
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

let lastTarget
const dropzone = document.getElementById("dropzone")

function dropEvent(e) {
    let file = e.dataTransfer.files[0]
    let fileName = file.name.split(".")

    dropzone.style.display = 'none'
    e.preventDefault()
}



document.addEventListener("dragover", function(e) {
    e.preventDefault()
})
document.addEventListener("dragenter", function(e) {
    lastTarget = e.target
    const files = e.dataTransfer.items
    if (files.length > 0) {
        dropzone.style.display = "flex"
        document.addEventListener("drop", dropEvent, {once: true})   

    }
})

document.addEventListener("dragleave", function (e) {
    if (e.target === lastTarget && dropzone.style.display === 'flex') {
        dropzone.style.display = 'none'
        document.removeEventListener("drop", dropEvent)
    }
})



// const projectCreateForm = document.getElementById("project-create")
// projectCreateForm.addEventListener("submit", (e) => {
//     const nameInput = projectCreateForm.getElementById("project-name")

//     const name = nameInput.value
//     nameInput.value = ""
//     createProject(name)
//     window.location.reload() // Refresh the project list instead of the page
// })

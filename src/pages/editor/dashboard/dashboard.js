import "../../root.css"
import "./dashboard.css"

import { createToast } from "../workspace/alerts"

import { createProject, getProject, getProjects, renameProject, deleteProject, saveBlocklyCompressed } from '../blockly/serialization';

import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from 'dayjs';

dayjs.extend(relativeTime)

const editProjectModal = document.querySelector("#edit-project-dialog")
const editForm = editProjectModal.querySelector("form")

const deleteProjectModal = document.getElementById("delete-project-dialog")
const deleteButtons = deleteProjectModal.querySelector("#delete-buttons")


// Upload tool
const uploadButton = document.getElementById("upload-project");
const fileInput = document.getElementById("fileInput");

uploadButton.addEventListener("click", () => { fileInput.click(); });
fileInput.addEventListener("change", (e) => {
    for (let file of e.target.files) {
        let reader = new FileReader();

        reader.addEventListener('load', (event) => {
            // TODO: SAVEBLOCKLYCOMPRESSED REQUIRES FILE VALIDATION
            let project = saveBlocklyCompressed(event.target.result);
            createToast("Project Imported!", `The project '${project["name"]}' has been imported`, "positive")
            refreshProjects()
        });
        reader.readAsText(file);
    }
});


const projectTemplate = document.getElementById("template-project")
const projectHolder = document.getElementById("project-holder")
let toolbarModal = document.getElementById("toolbar")

//Since the toolbar is using the .show() method it does not have a backdrop, and as thus does not close on click


populateProjects()
function populateProjects() {
    let projects = getProjects()

    let projectIds = Object.keys(projects)
    
    //If no projects may need to update this warning?
    if (projectIds.length === 0) {
        let warning = document.createElement("h1")
        warning.textContent = "No projects created! Please create one"
        projectHolder.appendChild(warning)

    } //if projects
    else {
        let sortedByTime = projectIds.sort((key1, key2) => dayjs(projects[key2]["time"]).diff(dayjs(projects[key1]["time"])))
        let projectIndex = 0
        for (const projectId of sortedByTime) {
            let project = projects[projectId]
            let clone = projectTemplate.content.cloneNode(true)
            let title = clone.querySelector(".project-name")
            let time = clone.querySelector(".project-date")
            let projectTime = dayjs(project["time"])
            time.textContent = projectTime.fromNow()
            title.textContent = project["name"]
            // thumbnail.src = project["thumbnail"]
            clone.querySelector(".project").id = `${projectId}`

            projectHolder.appendChild(clone)

            projectIndex++

        }
        for (let item of document.querySelectorAll(".project")) {
            item.addEventListener("click", projectClick)
        }
    }
    const projectElements = document.querySelectorAll(".project")
    for (const projectElement of projectElements) {
        let projectID = projectElement.id
        let project = projects[projectID]
        let thumbnail = projectElement.querySelector(".project-image")
        let spinner = projectElement.querySelector(".image-spinner")
        thumbnail.src = project["thumbnail"]
        spinner.style.display = "none"
        thumbnail.style.display = "block"


        
    }
}
document.addEventListener("click", (event) => {
    if (toolbarModal.hasAttribute("open") && (!deleteProjectModal.hasAttribute("open") || !editProjectModal.hasAttribute("open"))) {
        event.preventDefault()
        console.log("TOOLBAR CLOSE EVENT")
        event.stopImmediatePropagation()
        let rect = toolbarModal.getBoundingClientRect();

        if (rect.left > event.clientX ||
            rect.right < event.clientX ||
            rect.top > event.clientY ||
            rect.bottom < event.clientY
        ) {
            toolbarModal.close();
        }
        let item = event.target
        console.log(event.target)
        let dots = item.closest(".dots") 
        if (dots) {
            let project = dots.closest(".project")
            project.appendChild(toolbarModal)
            toolbarModal = document.getElementById("toolbar")
            toolbarModal.setAttribute("target", item.closest(".project").id)
            toolbarModal.show()
        }
    }
})
function refreshProjects() {
    projectHolder.replaceChildren()
    populateProjects()
}
function projectClick(e) {
    if (toolbarModal.hasAttribute("open") || e.target.closest("#toolbar")) return
    let item = e.target
    let dots = item.closest(".dots") //checking if there is the dots object near or above the item
    if (dots === null) { //If the dialog is clicked it will not have dots (as dots is its child)
        item = item.closest(".project")
        window.location.href = `/editor/workspace/${item.id}`
    }
    else { //if it is the edit menu dots clicked
        let project = dots.closest(".project")
        project.appendChild(toolbarModal)
        toolbarModal = document.getElementById("toolbar")
        toolbarModal.setAttribute("target", item.closest(".project").id)
        toolbarModal.show()
    }
    e.stopPropagation()
}



const createProjectButton = document.getElementById("create-project")
createProjectButton.addEventListener("click", function(e)  {
    let name = `untitled project`
    let id = createProject(name)
    window.location.href = `/editor/workspace/${id}`
})






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
                createToast("Project Changed!", `The project '${project["name"]}' has been renamed to '${newName}'`, "positive")
                refreshProjects()
                editProjectModal.close()
                toolbarModal.close()
                //Do something to confirm (thinking popup)
            }
            else { // Display the error somehow

            }
        }
    }, {once: true})
})



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
            createToast("Project Deleted!", `The project '${project["name"]}' has been deleted`, "negative")
            refreshProjects()
            deleteProjectModal.close()
            toolbarModal.close()
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
        event.stopPropagation()
    })
}

let lastTarget
const dropzone = document.getElementById("dropzone")

function dropEvent(e) {
    e.preventDefault()
    
    //Loading the files
    for (let file of e.dataTransfer.files) {
        let fileName = file.name.split(".")
        let fileEnd = fileName[fileName.length - 1]
        if (fileEnd !== "robox") return //not a robox file (error?)
        let reader = new FileReader();
        reader.addEventListener('load', (event) => {
            let project = saveBlocklyCompressed(event.target.result);
            createToast("Project Imported!", `The project '${project["name"]}' has been imported`, "positive")
            refreshProjects()
        });
        reader.readAsText(file);
    }
    dropzone.style.display = 'none'
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
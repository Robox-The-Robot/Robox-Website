import * as Blockly from 'blockly/core';
import "./index.css"
import "../colorvars.css"
import "./cross.png"

import { createProject, getProject, getProjects } from '../serialization';

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from 'dayjs';

dayjs.extend(relativeTime)

document.addEventListener("DOMContentLoaded", (event) => {
    const projectTemplate = document.querySelector("#template-project")
    const projectHolder = document.querySelector("#project-holder")
    let toolbarModal = document.querySelector("#toolbar")
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
            title.textContent = projectId
            clone.id = `${projectIndex}-project`

            projectHolder.appendChild(clone)

            projectIndex++

        }
        for (let item of document.querySelectorAll(".project")) {
            item.addEventListener("click", (e) => {
                let item = e.target
                let dots = item.closest(".dots")
                if (dots === null) { //Checking if it is the dialog being pressed or the dots
                    if (!e.target.classList.contains("project")) item = item.parentNode
                    const id = item.querySelector(".project-name").textContent.split(" ").join("-")
                    window.location.assign(`${window.location.href}workspace/${id}`)
                }
                else { //it is the dots
                    let boundingRect= dots.getBoundingClientRect()
                    let x = boundingRect["x"]+(boundingRect["width"])/2
                    let y = boundingRect["y"] + (boundingRect["height"]) / 2
                    toolbarModal.style.left = `${x}px`
                    toolbarModal.style.top = `${y}px`
                    toolbarModal.showModal()
                }
            })
        }
    }
    const createProjectButton = document.querySelector("#create-project")
    createProjectButton.addEventListener("click", function(e)  {
        //Check what level of untitled we are
        let level = 0
        let exists = true
        let text = `untitled-project${level}`
        while (exists !== false) {
            text = `untitled-project${level === 0 ? "" : "-" + level}`
            exists = getProject(text)
            level += 1
        }
        createProject(text)
    })
    
    

    //TODO: Make the toolbar follow the thing
    const editProjectModal = document.querySelector("#edit-project-dialog")
    document.querySelector("#edit-button").addEventListener("click", (event) => {
        editProjectModal.showModal()
    })
    const deleteProjectModal = document.querySelector("#delete-project-dialog")
    document.querySelector("#delete-button").addEventListener("click", (event) => {
        deleteProjectModal.showModal()
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
    

    // const projectCreateForm = document.getElementById("project-create")
    // projectCreateForm.addEventListener("submit", (e) => {
    //     const nameInput = projectCreateForm.querySelector("#project-name")

    //     const name = nameInput.value
    //     nameInput.value = ""
    //     createProject(name)
    //     window.location.reload()
    // })
})

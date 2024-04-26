import * as Blockly from 'blockly/core';
import "./index.css"
import "../colorvars.css"
import { getProjects } from '../serialization';

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
                if (!e.target.classList.contains("project")) item = item.parentNode
                const id = item.querySelector(".project-name").textContent.split(" ").join("-")
                
                window.location.assign(`${window.location.href}workspace/${id}`)
            })
        }

    }


    // const createProjectModal = document.querySelector("#create-project-dialog")
    // document.querySelector("#create-project").addEventListener("click", (event) => {
    //     createProjectModal.showModal()
    // })

    // createProjectModal.addEventListener("click", (event) => {
    //     let rect = event.target.getBoundingClientRect();
    //     if (rect.left > event.clientX ||
    //         rect.right < event.clientX ||
    //         rect.top > event.clientY ||
    //         rect.bottom < event.clientY
    //     ) {
    //         createProjectModal.close();
    //     }
    // })

    // const projectCreateForm = document.getElementById("project-create")
    // projectCreateForm.addEventListener("submit", (e) => {
    //     const nameInput = projectCreateForm.querySelector("#project-name")

    //     const name = nameInput.value
    //     nameInput.value = ""
    //     createProject(name)
    //     window.location.reload()
    // })
})

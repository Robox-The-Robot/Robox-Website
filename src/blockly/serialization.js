import dayjs from 'dayjs';
import * as Blockly from 'blockly';

export function getProjects() {
    let projects = localStorage.getItem("roboxProjects")
    if (!projects) {
        localStorage.setItem("roboxProjects", "{}")
        projects = {}
    }
    else projects = JSON.parse(projects)
    return projects
}
export function createProject(name) {
    let projects = getProjects()
    if (projects[name]) throw new Error("Project already exists")
    projects[name] = { time: dayjs(), workspace: false }
    localStorage.setItem("roboxProjects", JSON.stringify(projects))
}
export function getProject(name, projects = false) {
    if (!projects) {
        projects = getProjects()
    }
    if (projects[name] === undefined) return false
    return projects[name]
}
export function loadBlockly(name, workspace) {
    let project = getProject(name)
    let workspaceData = project.workspace
    if (!workspaceData) return;
    Blockly.Events.disable();
    Blockly.serialization.workspaces.load(workspaceData, workspace, undefined);
    Blockly.Events.enable();
}
export function saveBlockly(name, workspace) {
    const data = Blockly.serialization.workspaces.save(workspace)
    let projects = getProjects()
    projects[name] = { time: dayjs(), workspace: data }

    let projectData = JSON.stringify(projects)
    localStorage.setItem("roboxProjects", projectData)

    return projectData
}

export function renameProject(oldName, newName) {
    let projects = getProjects()
    if (!projects[oldName]) throw new Error("Project does not exist")
    if (projects[newName]) throw new Error("Project already exists")
    projects[newName] = structuredClone(projects[oldName])
    delete projects[oldName]
    console.log(1)
    localStorage.setItem("roboxProjects", JSON.stringify(projects))
}
export function deleteProject(name) {
    let projects = getProjects()
    if (!projects[name]) throw new Error("Project does not exist")
    delete projects[name]
    localStorage.setItem("roboxProjects", JSON.stringify(projects))
}
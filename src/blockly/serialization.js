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
    console.log(1)
    projects[name] = { time: dayjs(), workspace: data }
    localStorage.setItem("roboxProjects", JSON.stringify(projects))
}
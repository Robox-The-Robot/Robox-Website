import dayjs from 'dayjs';
import { Events, serialization } from 'blockly';
import { workspaceToSvg_ } from './screenshotHelper.js';

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
    let uuid = crypto.randomUUID();
    projects[uuid] = { name: name, time: dayjs(), workspace: false }
    localStorage.setItem("roboxProjects", JSON.stringify(projects))
    return uuid
}
export function getProject(uuid, projects = false) {
    if (!projects) {
        projects = getProjects()
    }
    if (projects[uuid] === undefined) return false
    return projects[uuid]
}
export function loadBlockly(uuid, workspace) {
    let project = getProject(uuid)
    let workspaceData = project.workspace
    if (!workspaceData) return;
    Events.disable();
    serialization.workspaces.load(workspaceData, workspace, undefined);
    Events.enable();
}
export function saveBlockly(uuid, workspace, callback) {
    workspaceToSvg_(workspace, (thumburi) => {
        const data = serialization.workspaces.save(workspace)
        let projects = getProjects()
        projects[uuid]["time"] = dayjs()
        projects[uuid]["workspace"] = data
        projects[uuid]["thumbnail"] = thumburi
        let projectData = JSON.stringify(projects)
        localStorage.setItem("roboxProjects", projectData)

        if (callback) callback(JSON.stringify(projects[uuid]));
    });
}

export function saveBlocklyCompressed(projectRaw) {
    // TODO: SAVEBLOCKLYCOMPRESSED REQUIRES FILE VALIDATION
    let projects = getProjects()
    let project = JSON.parse(projectRaw)
    let uuid = crypto.randomUUID();
    projects[uuid] = project
    projects[uuid]["time"] = dayjs()
    let projectData = JSON.stringify(projects)
    localStorage.setItem("roboxProjects", projectData)
    return projectData
}

export function renameProject(uuid, newName) {
    let projects = getProjects()
    if (!projects[uuid]) throw new Error("Project does not exist")
    projects[uuid]["name"] = newName
    localStorage.setItem("roboxProjects", JSON.stringify(projects))
}
export function deleteProject(uuid) {
    let projects = getProjects()
    if (!projects[uuid]) throw new Error("Project does not exist")
    delete projects[uuid]
    localStorage.setItem("roboxProjects", JSON.stringify(projects))
}
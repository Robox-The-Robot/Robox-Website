/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {inject, Events} from 'blockly';
import { createToast } from "../alerts.js"



import { renameProject, loadBlockly, saveBlockly, getProject } from '../../blockly/serialization.js';

import theme from '../../blockly/theme/theme.js';
import '../../blockly/theme/category.js';


import {toolbox} from '../../blockly/toolbox.js';

// await import("../../ blockly/blocks/*")

let blocks = import.meta.webpackContext("../../blockly/blocks", {
    recursive: false,
    regExp: /\.js$/,
});
let generators = import.meta.webpackContext("../../blockly/generators", {
    recursive: false,
    regExp: /\.js$/,
});
blocks.keys().forEach(modulePath => {
    const block = blocks(modulePath);
});
generators.keys().forEach(modulePath => {
    const generator = generators(modulePath);
});
    
// try {
//     await import(
//         /* webpackChunkName: "blocks" */ 
//         /* webpackInclude: /\.js$/ */ 
//         `../../blockly/blocks/${block}`)
//     await import(
//         /* webpackChunkName: "generators" */ 
//         /* webpackInclude: /\.js$/ */ 
//         `../../blockly/generators/${generator}`)
// }
// catch {}


import("../usb.js") 



// Set up UI elements and inject Blockly
const blocklyDiv = document.getElementById('blocklyDiv');
const ws = inject(blocklyDiv, {
    toolbox: toolbox,
    grid: {
        spacing: 32,
        length: 6,
        colour: 'rgb(129,190,151)',
        snap: true
    },
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
        pinch: true
    },
    trashcan: false,
    theme: theme,
});


ws.addChangeListener(Events.disableOrphans)

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.

const urlParams = new URLSearchParams(window.location.search);
const workspaceId = urlParams.get('id')
const project = getProject(workspaceId)
let workspaceName = project["name"]

loadBlockly(workspaceId, ws)

if (!project["thumbnail"]) {
    saveBlockly(workspaceId, ws);
}

// blocklyFlyout
let currentWorkspace = workspaceName
let renameTitle = document.getElementById("project-name")
renameTitle.value = workspaceName
renameTitle.addEventListener("blur", function (e) {
    if (renameTitle.value !== currentWorkspace) {
        let newName = renameTitle.value
        renameProject(workspaceId, newName)
        createToast("Project Renamed!", "The project has been renamed", "positive")
    }
})

// Save/export workspace
ws.addChangeListener((e) => { // Saving every time block is added
    if (e.isUiEvent) return;
    saveBlockly(workspaceId, ws);
});

document.getElementById("export").addEventListener("click", (e) => {
    saveBlockly(workspaceId, ws, (fileDownload) => {
        let downloadEl = document.createElement('a');
        downloadEl.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileDownload));
        downloadEl.setAttribute('download', workspaceName.split(" ").join("-") + '.robox');

        downloadEl.style.display = 'none';
        document.body.appendChild(downloadEl);
        downloadEl.click();
        document.body.removeChild(downloadEl);
    });
});

const blocklyFlyout = document.querySelector(".blocklyFlyout")
const blocklyToolbar = document.querySelector(".blocklyToolboxDiv")
const deleteIndicator = document.getElementById("delete-drag")



ws.addChangeListener((e) => { //On drag show delete menu
    if (e.type !== Events.BLOCK_DRAG) return
    let width = blocklyFlyout.style.display === "none" ? blocklyToolbar.getBoundingClientRect()["width"] : blocklyFlyout.getBoundingClientRect()["right"] 
    
    if (e.isStart) {
        deleteIndicator.style.width = `${width}px`
        deleteIndicator.style.display = "flex"
    }
    else {
        deleteIndicator.style.display = "none"
    }
})
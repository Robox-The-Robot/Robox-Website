/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python'
import "./workspace.css"
import "../colorvars.css"
import "./RoboxLogo.png"
import "./sadRobox.png"

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import {editProject, loadBlockly, saveBlockly, getProject} from '../blockly/serialization';

import theme from '../blockly/theme/theme';
import '../blockly/theme/category';


import {toolbox} from '../blockly/toolbox';


import "../blockly/blocks/sensor"
import "../blockly/generators/sensor"

import "../blockly/blocks/events"
import "../blockly/generators/events"

import "./usb.js"



// Set up UI elements and inject Blockly
const blocklyDiv = document.getElementById('blocklyDiv');
const ws = Blockly.inject(blocklyDiv, {
    toolbox: toolbox, 
    grid: {
        spacing: 32,
        length: 6,
        colour: 'rgb(129,190,151)',
        snap: true
    },
    trashcan: false,
});

//Use the custom theme
ws.setTheme(theme)
ws.addChangeListener(Blockly.Events.disableOrphans)

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const runCode = () => {
    const code = pythonGenerator.workspaceToCode(ws);
};

const workspacePath = window.location.pathname.split("/")
const workspaceName = workspacePath[workspacePath.length - 1].split("-").join(" ")

loadBlockly(workspaceName, ws)

runCode();

let currentWorkspace = workspaceName
let renameTitle = document.querySelector("#project-name")
renameTitle.value = workspaceName
renameTitle.addEventListener("blur", function (e) {
    if (renameTitle.value !== currentWorkspace) {
        let newName = renameTitle.value
        let checkProject = getProject(newName)
        if (checkProject === false) { //good to go
            editProject(currentWorkspace, newName)
            //Do something to confirm (thinking popup)
        }
        else { // Display the error somehow

        }
    }
})

ws.addChangeListener((e) => {

    if (e.isUiEvent) return;
    saveBlockly(workspaceName, ws);
});
document.addEventListener("DOMContentLoaded", (event) => {
    const backButton = document.querySelector("#back")
    backButton.addEventListener("click", function(e) {
        window.location.assign('http://localhost:3000/')
    })
})
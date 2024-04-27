/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python'
import "./workspace.css"

import {loadBlockly, saveBlockly} from '../blockly/serialization';

import theme from '../blockly/theme/theme';
import '../blockly/theme/category';


import {toolbox} from '../blockly/toolbox';


import "../blockly/blocks/sensor"
import "../blockly/generators/sensor"

import "../blockly/blocks/events"
import "../blockly/generators/events"




// Set up UI elements and inject Blockly
const blocklyDiv = document.getElementById('blocklyDiv');
const ws = Blockly.inject(blocklyDiv, {toolbox});

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


ws.addChangeListener((e) => {

    if (e.isUiEvent) return;
    saveBlockly(workspaceName, ws);
});


// // Whenever the workspace changes meaningfully, run the code again.
// ws.addChangeListener((e) => {
//     // Don't run the code when the workspace finishes loading; we're
//     // already running it once when the application starts.
//     // Don't run the code during drags; we might have invalid state.
//     if (e.isUiEvent || e.type == Blockly.Events.FINISHED_LOADING || ws.isDragging()) {
//         return;
//     }
//     runCode();
// });

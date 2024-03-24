/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python'

import {save, load} from './serialization';

import theme from './theme/theme';
import './theme/category';


import {toolbox} from './toolbox';



import './index.css';

import "./blocks/sensor"
import "./generators/sensor"

import "./blocks/events"
import "./generators/events"




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


load(ws);

runCode();


ws.addChangeListener((e) => {

    if (e.isUiEvent) return;
    save(ws);
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

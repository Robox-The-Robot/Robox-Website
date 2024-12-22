

import * as Blockly from 'blockly/core';
const sensors = [
    {
        "type": "ultrasonic_distance",
        "tooltip": "",
        "helpUrl": "",
        "message0": "distance %1",
        "args0": [
            {
                "type": "input_dummy",
                "name": "NAME"
            } 
        ],
        "output": null,
        "colour": "%{BKY_SENSOR_HUE}",
        "inputsInline": true
    },
]

Blockly.defineBlocksWithJsonArray(sensors);

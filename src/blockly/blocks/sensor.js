

import * as Blockly from 'blockly/core';


const sensors = [
    {
        "type": "distance",
        "message0": "distance",
        "output": "Number",
        "colour": "%{BKY_SENSOR_HUE}",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "line_position",
        "message0": "line position",
        "output": "Number",
        "colour": "%{BKY_SENSOR_HUE}",
        "tooltip": "",
        "helpUrl": ""
    },
]


Blockly.defineBlocksWithJsonArray(sensors);

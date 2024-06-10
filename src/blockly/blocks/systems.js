import * as Blockly from 'blockly/core';

const systems = [{
    "type": "sleep",
    "message0": "sleep for %1 seconds",
    "args0": [
        {
            "type": "input_value",
            "name": "time",
            "check": "Number"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_SYSTEM_HUE}",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "led_toggle",
    "message0": "toggle led",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_SYSTEM_HUE}",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "led_bool",
    "message0": "turn LED %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "state",
            "options": [
                [
                    "ON",
                    "on"
                ],
                [
                    "OFF",
                    "off"
                ]
            ]
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_SYSTEM_HUE}",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "get_time",
    "message0": "current time",
    "inputsInline": true,
    "output": "Number",
    "colour": "%{BKY_SYSTEM_HUE}",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "get_led_state",
    "message0": "led state",
    "inputsInline": true,
    "output": "Boolean",
    "colour": "%{BKY_SYSTEM_HUE}",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "wait_until",
    "message0": "wait until %1",
    "args0": [
        {
            "type": "input_value",
            "name": "bool",
            "check": "Boolean"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_SYSTEM_HUE}",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "print",
    "message0": "print %1",
    "args0": [
        {
            "type": "input_value",
            "name": "string",
            "check": "String"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_SYSTEM_HUE}",
    "tooltip": "",
    "helpUrl": ""
}]

Blockly.defineBlocksWithJsonArray(systems);
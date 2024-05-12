import * as Blockly from 'blockly/core';

const systems = [
    {
        "type": "get_led_state",
        "message0": "led state",
        "inputsInline": true,
        "output": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "get_time",
        "message0": "current time",
        "inputsInline": true,
        "output": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "led_bool",
        "message0": "turn LED on %1",
        "args0": [
            {
                "type": "input_value",
                "name": "led_on",
                "check": "Boolean"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "led_toggle",
        "message0": "toggle led",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "sleep",
        "message0": "sleep for %1 %2",
        "args0": [
            {
                "type": "input_value",
                "name": "time"
            },
            {
                "type": "field_label_serializable",
                "name": "time",
                "text": "seconds"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "wait_until",
        "message0": "wait until %1",
        "args0": [
            {
                "type": "input_value",
                "name": "NAME",
                "check": "Boolean"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
]
Blockly.defineBlocksWithJsonArray(systems);


import * as Blockly from 'blockly/core';


const sensors = [
    {
        "type": "run_motor_time",
        "message0": "run motor %1 %2 %3 at %4 %5 %% power for %6 %7 %8",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "motor",
                "options": [
                    [
                        "A",
                        "A"
                    ],
                    [
                        "B",
                        "B"
                    ],
                    [
                        "C",
                        "C"
                    ],
                    [
                        "D",
                        "D"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "power",
                "check": "Number"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "time",
                "check": "Number"
            },
            {
                "type": "field_label_serializable",
                "name": "plural",
                "text": "second"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "%{BKY_MOTOR_HUE}",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "run_motor",
        "message0": "run motor %1 %2 %3 at %4 %5 %% power",
        "args0": [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "motor",
                "options": [
                    [
                        "A",
                        "A"
                    ],
                    [
                        "B",
                        "B"
                    ],
                    [
                        "C",
                        "C"
                    ],
                    [
                        "D",
                        "D"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "power",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "%{BKY_MOTOR_HUE}",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "stop_motor",
        "message0": "stop motor %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "motor",
                "options": [
                    [
                        "A",
                        "A"
                    ],
                    [
                        "B",
                        "B"
                    ],
                    [
                        "C",
                        "C"
                    ],
                    [
                        "D",
                        "D"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "%{BKY_MOTOR_HUE}",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "stop_motors",
        "message0": "stop motors",
        "previousStatement": null,
        "nextStatement": null,
        "colour": "%{BKY_MOTOR_HUE}",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "steer_motors",
        "message0": "steer motors %1 + %2 to %3 %4 at %5 %6 %% speed",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "left_motor",
                "options": [
                    [
                        "A",
                        "A"
                    ],
                    [
                        "B",
                        "B"
                    ],
                    [
                        "C",
                        "C"
                    ],
                    [
                        "D",
                        "D"
                    ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "right_motor",
                "options": [
                    [
                        "A",
                        "A"
                    ],
                    [
                        "B",
                        "B"
                    ],
                    [
                        "C",
                        "C"
                    ],
                    [
                        "D",
                        "D"
                    ]
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "direction",
                "check": "Number"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "speed",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "%{BKY_MOTOR_HUE}",
        "tooltip": "",
        "helpUrl": ""
    }
]


Blockly.defineBlocksWithJsonArray(sensors);

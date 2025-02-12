

import * as Blockly from 'blockly/core';
const sensors = [
    {
        "type": "ultrasonic_distance",
        "tooltip": "",
        "helpUrl": "",
        "message0": "distance",
        "output": null,
        "colour": "%{BKY_SENSOR_HUE}",
        "inputsInline": true
    },
    {
        "type": "sensor_bool",
        "tooltip": "",
        "helpUrl": "",
        "message0": "%1 sensor is colour %2",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "sensor",
            "options": [
              [
                "left",
                "0"
              ],
              [
                "right",
                "1"
              ]
            ]
          },
          {
            "type": "field_colour",
            "name": "colour",
            "colour": "#FFFFFF",
            "colourOptions": [
                '#FFFFFF',
                '#000000',
            ],
          },
        ],
        "output": "Boolean",
        "colour":  "%{BKY_SENSOR_HUE}",
        "inputsInline": true
      },
      {
        "type": "distance_bool",
        "tooltip": "",
        "helpUrl": "",
        "message0": "distance is %1 %2",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "equality",
            "options": [
              [
                "equal to",
                "=="
              ],
              [
                "closer than",
                "<"
              ],
              [
                "farther than",
                ">"
              ]
            ]
          },
          {
            "type": "input_value",
            "name": "number",
            "check": "Number"
          }
        ],
        "colour":  "%{BKY_SENSOR_HUE}",
        "output": "Boolean",
        "inputsInline": true

      }      
]
Blockly.defineBlocksWithJsonArray(sensors);


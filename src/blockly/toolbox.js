/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/*
This toolbox contains nearly every single built-in block that Blockly offers,
in addition to the custom block 'add_text' this sample app adds.
You probably don't need every single block, and should consider either rewriting
your toolbox from scratch, or carefully choosing whether you need each block
listed here.
*/

export const toolbox = {
  'kind': 'categoryToolbox',
  'contents': [
    {
      'kind': 'category',
      'name': 'Events',
      'categorystyle': 'events_category',
      'contents': [
        {
          'kind': 'block',
          'type': 'event_begin',
        },
      ]
    },
    {
      'kind': 'sep',
    },
    
    {
      'kind': 'category',
      'name': 'Logic',
      'categorystyle': 'logic_category',
      'contents': [
        {
          'kind': 'block',
          'type': 'controls_if',
        },
        {
          'kind': 'block',
          'type': 'logic_compare',
        },
        {
          'kind': 'block',
          'type': 'logic_operation',
        },
        {
          'kind': 'block',
          'type': 'logic_negate',
        },
        {
          'kind': 'block',
          'type': 'logic_boolean',
        },
        {
          'kind': 'block',
          'type': 'logic_null',
        },
        {
          'kind': 'block',
          'type': 'logic_ternary',
        },
      ],
    },
    {
      'kind': 'category',
      'name': 'Loops',
      'categorystyle': 'loop_category',
      'contents': [
        {
          'kind': 'block',
          'type': 'controls_repeat_ext',
          'inputs': {
            'TIMES': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 10,
                },
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'controls_whileUntil',
        },
        {
          'kind': 'block',
          'type': 'controls_for',
          'inputs': {
            'FROM': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 1,
                },
              },
            },
            'TO': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 10,
                },
              },
            },
            'BY': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 1,
                },
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'controls_forEach',
        },
        {
          'kind': 'block',
          'type': 'controls_flow_statements',
        },
      ],
    },
    {
      'kind': 'category',
      'name': 'Math',
      'categorystyle': 'math_category',
      'contents': [
        {
          'kind': 'block',
          'type': 'math_number',
          'fields': {
            'NUM': 123,
          },
        },
        {
          'kind': 'block',
          'type': 'math_arithmetic',
          'inputs': {
            'A': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 1,
                },
              },
            },
            'B': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 1,
                },
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'math_single',
          'inputs': {
            'NUM': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 9,
                },
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'math_trig',
          'inputs': {
            'NUM': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 45,
                },
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'math_constant',
        },
        {
          'kind': 'block',
          'type': 'math_number_property',
          'inputs': {
            'NUMBER_TO_CHECK': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 0,
                },
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'math_round',
          'fields': {
            'OP': 'ROUND',
          },
          'inputs': {
            'NUM': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 3.1,
                },
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'math_on_list',
          'fields': {
            'OP': 'SUM',
          },
        },
        {
          'kind': 'block',
          'type': 'math_modulo',
          'inputs': {
            'DIVIDEND': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 64,
                },
              },
            },
            'DIVISOR': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 10,
                },
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'math_constrain',
          'inputs': {
            'VALUE': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 50,
                },
              },
            },
            'LOW': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 1,
                },
              },
            },
            'HIGH': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 100,
                },
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'math_random_int',
          'inputs': {
            'FROM': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 1,
                },
              },
            },
            'TO': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 100,
                },
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'math_random_float',
        },
        {
          'kind': 'block',
          'type': 'math_atan2',
          'inputs': {
            'X': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 1,
                },
              },
            },
            'Y': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 1,
                },
              },
            },
          },
        },
      ],
    },
    {
      'kind': 'category',
      'name': 'Lists',
      'categorystyle': 'list_category',
      'contents': [
        {
          'kind': 'block',
          'type': 'lists_create_with',
        },
        {
          'kind': 'block',
          'type': 'lists_create_with',
        },
        {
          'kind': 'block',
          'type': 'lists_repeat',
          'inputs': {
            'NUM': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 5,
                },
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'lists_length',
        },
        {
          'kind': 'block',
          'type': 'lists_isEmpty',
        },
        {
          'kind': 'block',
          'type': 'lists_indexOf',
          'inputs': {
            'VALUE': {
              'block': {
                'type': 'variables_get',
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'lists_getIndex',
          'inputs': {
            'VALUE': {
              'block': {
                'type': 'variables_get',
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'lists_setIndex',
          'inputs': {
            'LIST': {
              'block': {
                'type': 'variables_get',
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'lists_getSublist',
          'inputs': {
            'LIST': {
              'block': {
                'type': 'variables_get',
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'lists_split',
          'inputs': {
            'DELIM': {
              'shadow': {
                'type': 'text',
                'fields': {
                  'TEXT': ',',
                },
              },
            },
          },
        },
        {
          'kind': 'block',
          'type': 'lists_sort',
        },
        {
          'kind': 'block',
          'type': 'lists_reverse',
        },
      ],
    },
    {
      'kind': 'sep',
    },
    {
      'kind': 'category',
      'name': 'Sensors',
      'categorystyle': 'sensor_category',
      'contents': [
        {
          'kind': 'block',
          'type': 'ultrasonic_distance',
        },
      ]
    },
    {
      'kind': 'category',
      'name': 'System',
      'categorystyle': 'system_category',
      'contents': [
        {
          'kind': 'block',
          'type': 'sleep',
          "inputs": {
            'time': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 1,
                },
              },
            },
          }
        },
        {
          'kind': 'block',
          'type': 'print',
          "inputs": {
            'string': {
              'shadow': {
                'type': 'text',
                'fields': {
                  'TEXT': '',
                },
              },
            },
          }
        },
        {
          'kind': 'block',
          'type': 'led_toggle',
        },
        {
          'kind': 'block',
          'type': 'led_bool',
        },
        {
          'kind': 'block',
          'type': 'get_time',
        },
        {
          'kind': 'block',
          'type': 'get_led_state',
        },
        {
          'kind': 'block',
          'type': 'wait_until',
        },
        
      ]
    },
    {
      'kind': 'category',
      'name': 'Motors',
      'categorystyle': 'motor_category',
      'contents': [
        {
          'kind': 'block',
          'type': 'define_movement_motors',
        },
        {
          'kind': 'block',
          'type': 'motor_move',
        },
        {
          'kind': 'block',
          'type': 'motor_turn',
        },
        {
          'kind': 'block',
          'type': 'motor_percentage',
          "inputs": {
            'left_motor': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 50,
                },
              },
            },
            'right_motor': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 50,
                },
              },
            },
          }
          
        },
        {
          'kind': 'block',
          'type': 'motor_single_move',
          "inputs": {
            'power': {
              'shadow': {
                'type': 'math_number',
                'fields': {
                  'NUM': 50,
                },
              },
            },
          }

        },

      ]
    },
    {
      'kind': 'sep',
    },
    {
      'kind': 'category',
      'name': 'Variables',
      'categorystyle': 'variable_category',
      'custom': 'VARIABLE',
    },
    {
      'kind': 'category',
      'name': 'Functions',
      'categorystyle': 'procedure_category',
      'custom': 'PROCEDURE',
    },
  ],
};

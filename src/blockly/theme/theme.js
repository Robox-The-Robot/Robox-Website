import * as Blockly from 'blockly';
import Theme from '@blockly/theme-modern';

Blockly.utils.colour.setHsvValue(0.96)
Blockly.utils.colour.setHsvSaturation(0.63)
export default Blockly.Theme.defineTheme('themeName', {
    'base': Theme,
    componentStyles: {
        'workspaceBackgroundColour': '#A1EEBD',
        'toolboxBackgroundColour': "#EDE9E5",
        'flyoutBackgroundColour': '#F6F4C3',
        'flyoutOpacity': 1,
    },
    categoryStyles: {
        'sensor_category': {
            'colour': '#FF90BC'
        },
        'motor_category': {
            'colour': '#DFCCFB'
        },
        "system_category": {
            'colour': '#E6A573'
        },
        "events_category": {
            'colour': "#D373E6"
        },
        "logic_category": {
            'colour': '#7BD3EA'
        },
        "loop_category": {
            'colour': '#E75CF6'
        },
        
        "math_category": {
            'colour': '#A95CF6'
        },
        "text_category": {
            'colour': '#5C85F6'
        },
        "list_category": {
            'colour': '#5CF6A9'
        },
        "colour_category": {
            'colour': '#DFE673'
        },
        "variable_category": {
            'colour': 'F65C5C'
        },
        "procedure_category": {
            'colour': '#F6E15C'
        }

    },
    startHats: true
});

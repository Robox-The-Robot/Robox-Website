import * as Blockly from 'blockly';
import Theme from '@blockly/theme-modern';

Blockly.Msg.SENSOR_HUE = 0;
Blockly.Msg.EVENT_HUE = 190;
Blockly.Msg.MOTOR_HUE = 176;
Blockly.Msg.SYSTEM_HUE = 42;






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
            'colour': '%{BKY_SENSOR_HUE}'
        },
        'motor_category': {
            'colour': '%{BKY_MOTOR_HUE}'
        },
        "system_category": {
            'colour': '%{BKY_SYSTEM_HUE}'
        },
        "events_category": {
            'colour': '%{BKY_EVENT_HUE}'
        },
    },
    blockStyles: {
        "sensor_blocks": '%{BKY_SENSOR_HUE}',
    },

    startHats: true
});

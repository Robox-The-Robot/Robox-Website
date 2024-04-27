import * as Blockly from 'blockly';
import Theme from '@blockly/theme-modern';

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
            'colour': '#A65C5C'
        },
        "events_category": {
            'colour': "#9FA55B"
        }
    },
    startHats: true
});

import * as Blockly from 'blockly';
import Theme from '@blockly/theme-modern';

export default Blockly.Theme.defineTheme('themeName', {
    'base': Theme,
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

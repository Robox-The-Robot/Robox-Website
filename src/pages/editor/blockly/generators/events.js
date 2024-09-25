import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python'

pythonGenerator.forBlock['event_begin'] = function (block, generator) {
    var event_code = generator.statementToCode(block, 'event_code');
    var code = `def event_begin():\n${event_code}`;
    return code;
};



import * as Blockly from 'blockly/core';
import { pythonGenerator, Order } from 'blockly/python'

pythonGenerator.forBlock['distance'] = function (block, generator) {
    var code = 'ultrasonic.distance()';
    return [code, Order.ATOMIC];
};
pythonGenerator.forBlock['line_position'] = function (block, generator) {
    var code = 'ultrasonic.distance()';
    return [code, Order.ATOMIC];
};
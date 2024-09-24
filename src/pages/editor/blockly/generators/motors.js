import * as Blockly from 'blockly/core';
import { pythonGenerator, Order } from 'blockly/python'

pythonGenerator.forBlock['define_movement_motors'] = function (block, generator) {
    var dropdown_left_motor = block.getFieldValue('left_motor');
    var dropdown_right_motor = block.getFieldValue('right_motor');
    // TODO: Assemble python into code variable.
    var code = '...\n';
    return code;
};

pythonGenerator.forBlock['motor_move'] = function (block, generator) {
    var dropdown_direction = block.getFieldValue('direction');
    // TODO: Assemble python into code variable.
    var code = '...\n';
    return code;
};

pythonGenerator.forBlock['motor_turn'] = function (block, generator) {
    var dropdown_direction = block.getFieldValue('direction');
    // TODO: Assemble python into code variable.
    var code = '...\n';
    return code;
};

pythonGenerator.forBlock['motor_percentage'] = function (block, generator) {
    var value_left_motor = generator.valueToCode(block, 'left_motor', python.Order.ATOMIC);
    var value_right_motor = generator.valueToCode(block, 'right_motor', python.Order.ATOMIC);
    // TODO: Assemble python into code variable.
    var code = '...\n';
    return code;
};

pythonGenerator.forBlock['motor_single_move'] = function (block, generator) {
    var dropdown_motor = block.getFieldValue('motor');
    var value_power = generator.valueToCode(block, 'power', python.Order.ATOMIC);
    // TODO: Assemble python into code variable.
    var code = '...\n';
    return code;
};
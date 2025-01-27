
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
    var code = `motors.run_motors(${dropdown_direction}*motor_speed,${dropdown_direction}*motor_speed)`;
    return code;
};

pythonGenerator.forBlock['motor_turn'] = function (block, generator) {
    var dropdown_direction = block.getFieldValue('direction');
    // TODO: Assemble python into code variable.
    var code = `motors.run_motors(${dropdown_direction == right ? 1 : -1}*motor_speed,${dropdown_direction == left ? -1 : 1}*motor_speed)`;
    return code;
};

pythonGenerator.forBlock['motor_percentage'] = function (block, generator) {
    var value_left_motor = generator.valueToCode(block, 'left_motor', Order.ATOMIC);
    var value_right_motor = generator.valueToCode(block, 'right_motor', Order.ATOMIC);
    // TODO: Assemble python into code variable.
    var code = `motors.run_motors(${value_left_motor},${value_right_motor})`;
    return code;
};

pythonGenerator.forBlock['motor_single_move'] = function (block, generator) {
    var dropdown_motor = block.getFieldValue('motor');
    var value_power = generator.valueToCode(block, 'power', Order.ATOMIC);
    // TODO: Assemble python into code variable.
    var code = `motors.run_motors(${dropdown_motor == right ? 1 : 0}*${value_power},${dropdown_motor == left ? 1 : 0}*motor_speed)`;
    return code;
};
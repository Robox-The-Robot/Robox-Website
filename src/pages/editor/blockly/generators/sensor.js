


import { pythonGenerator, Order } from 'blockly/python'

pythonGenerator.forBlock['distance'] = function (block, generator) {
    var code = 'ultrasonic.distance()';
    return [code, Order.ATOMIC];
};
pythonGenerator.forBlock['left_line_sensor'] = function (block, generator) {
    var code = 'line.read_line_position()[0]';
    return [code, Order.ATOMIC];
};
pythonGenerator.forBlock['right_line_sensor'] = function (block, generator) {
    var code = 'line.read_line_position()[1]';
    return [code, Order.ATOMIC];
};
// pythonGenerator.forBlock['line_position'] = function (block, generator) {
//     var code = 'ultrasonic.distance()';
//     return [code, Order.ATOMIC];
// };
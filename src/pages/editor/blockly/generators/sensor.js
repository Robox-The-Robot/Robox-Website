


import { pythonGenerator, Order } from 'blockly/python'

pythonGenerator.forBlock['ultrasonic_distance'] = function (block, generator) {
    var code = 'ultrasonic.distance()';
    return [code, Order.ATOMIC];
};
pythonGenerator.forBlock['sensor_bool'] = function() {
    const dropdown_sensor = block.getFieldValue('sensor');
    const colour_colour = block.getFieldValue('colour');

    const code = `${colour_colour === "#FFFFFF" ? "not" : ""} read_linesensor${dropdown_sensor} == 0`;
    return [code, Order.NONE];
}
// pythonGenerator.forBlock['line_position'] = function (block, generator) {
//     var code = 'ultrasonic.distance()';
//     return [code, Order.ATOMIC];
// };
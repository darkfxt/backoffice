"use strict";
exports.__esModule = true;
function get() {
    var config = Object.assign({}, require('./env'));
    return config.config;
}
exports.get = get;

'use strict';

var compose = require('compose-function');

function callWithGenericFunction(name, defaultValue, mappingFunction, genericFunction) {
    if (!mappingFunction && typeof defaultValue === 'function') {
        mappingFunction = defaultValue;
        defaultValue = undefined;
    }

    if (!mappingFunction) {
        mappingFunction = genericFunction;
    } else {
        mappingFunction = compose(mappingFunction, genericFunction);
    }

    return module.exports(name, defaultValue, mappingFunction);
}

/**
 * Get environment variable or fall back to default value if not
 * available.
 * Throws an error if variable is not found and no default value
 * is supplied.
 *
 * @param {string} name Name of key to get from process.env
 * @param {*} [defaultValue] Default value
 * @param {function} [mappingFunction] Mapping function to apply to the data
 * read from the environment
 * @return {*}
 */
module.exports = function getEnvVar(name, defaultValue, mappingFunction) {
    if (!mappingFunction && typeof defaultValue === 'function') {
        mappingFunction = defaultValue;
        defaultValue = undefined;
    }

    if (!process.env.hasOwnProperty(name) && defaultValue === undefined) {
        throw new Error('Environment variable ' + name + ' is not set');
    }

    if (!process.env.hasOwnProperty(name)) {
        return defaultValue;
    }

    if (mappingFunction) {
        return mappingFunction(process.env[name]);
    }

    return process.env[name];
};

module.exports.integer = function getIntegerEnvVar(name, defaultValue, mappingFunction) {
    return callWithGenericFunction(name, defaultValue, mappingFunction, function(value) {
        return parseInt(value, 10);
    });
};

module.exports.boolean = function getBooleanEnvVar(name, defaultValue, mappingFunction) {
    return callWithGenericFunction(name, defaultValue, mappingFunction, function(value) {
        return value === 'true';
    });
};

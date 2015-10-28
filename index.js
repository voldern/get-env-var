'use strict';

/**
 * Get environment variable or fall back to default value if not
 * available.
 * Throws an error if variable is not found and no default value
 * is supplied.
 *
 * @param {string} name Name of key to get from process.env
 * @param {*} [defaultValue] Default value
 * @return {*}
 */
module.exports = function getEnvVar(name, defaultValue) {
    if (!process.env.hasOwnProperty(name) && arguments.length <= 1) {
        throw new Error('Environment variable ' + name + ' is not set');
    }

    if (!process.env.hasOwnProperty(name)) {
        return defaultValue;
    }

    return process.env[name];
};

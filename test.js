'use strict';

var test = require('tape'),
    randomstring = require('randomstring'),
    getEnvVar = require('./');

test('should return environment variable', function(t) {
    t.plan(1);

    var key = randomstring.generate();
    process.env[key] = 'Test';

    t.equal(getEnvVar(key), 'Test');
});

test('should fallback to default value', function(t) {
    t.plan(1);

    var key = randomstring.generate();

    t.equal(getEnvVar(key, 'Test2'), 'Test2');
});

test('should throw error when variable is not set and no default value is supplied', function(t) {
    t.plan(2);

    var key = randomstring.generate();

    t.throws(function() {
        getEnvVar(key);
    }, /Environment variable .* is not set/);

    t.throws(function() {
        getEnvVar(key, undefined);
    }, /Environment variable .* is not set/);
});

test('should apply mapping function to env data', function(t) {
    t.plan(3);

    var key = randomstring.generate();
    process.env[key] = '15';

    t.equal(getEnvVar(key, Number.parseInt), 15);
    t.equal(getEnvVar(key, 10, Number.parseInt), 15);
    t.equal(getEnvVar(key, undefined, Number.parseInt), 15);
});

test('should not apply mapping function to default value', function(t) {
    t.plan(1);
    t.equal(getEnvVar(randomstring.generate(), '10', Number.parseInt), '10');
});

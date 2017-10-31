# get-env-var

A little function that reads an environment variable from
`process.env` with support for default values and a optional mapping
function applied to the data read from the environment.

It will throw an exception if key can't be found and no default
value is supplied.

[![build status](https://travis-ci.org/voldern/get-env-var.svg)](https://travis-ci.org/voldern/get-env-var)
[![modules status](https://david-dm.org/voldern/get-env-var.svg)](https://david-dm.org/voldern/get-env-var)

[![npm badge](https://nodei.co/npm/get-env-var.png?downloads=true)](https://nodei.co/npm/get-env-var)

# Example

```javascript
var getEnvVar = require('get-env-var');

getEnvVar('SOME_VAL', 'defaultValue');
getEnvVar('SOME_INT_VAL', Number.parseInt);
getEnvVar('SOME_INT_VAL', 20, Number.parseInt);
```

# Shorthands

The following shorthand methods currently exists. They have the same
API as the generic method. The mapping function is applied to the
transformed value.

## Boolean

`getEnvVar.boolean` is a shorthand method that returns true if the
value equals 'true' and false in all other cases.

## Integer

`getEnvVar.integer` is a shorthand method that calls `parseInt(value, 10)`.

# License

MIT

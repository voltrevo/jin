'use strict';

var parser = require('voltrevo-parser').flat;

var identifier = require('./identifier.js');

module.exports = parser.list(identifier, parser.single(','));

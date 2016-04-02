'use strict';

var parser = require('voltrevo-parser').flat;

var jin = require('./jin.js');
var StructuredPromise = require('./StructuredPromise.js');

var inst = jin({
  plus: function(x, y) {
    return x + y;
  }
});

module.exports = function(text) {
  return StructuredPromise(inst.consume(parser.Stream(text)).value);
};

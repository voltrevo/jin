'use strict';

var range = require('./range.js');

var StructuredPromise = function(structure) {
  if (Array.isArray(structure)) {
    return Promise.all(structure.map(StructuredPromise));
  }

  if (typeof structure === 'object' && structure !== null) {
    if (typeof structure.then === 'function') {
      return structure;
    }

    var keys = Object.keys(structure);

    return StructuredPromise(keys.map(function(key) {
      return structure[key];
    })).then(function(values) {
      var obj = {};

      range(keys.length).forEach(function(i) {
        obj[keys[i]] = values[i];
      });

      return obj;
    });
  }

  return Promise.resolve(structure);
};

module.exports = StructuredPromise;

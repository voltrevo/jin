'use strict';

var parser = require('voltrevo-parser').flat;

module.exports = parser.name('identifier', parser.transform(
  parser.sequence(
    parser.constrainAcceptance(
      parser.any,
      function(c) {
        return /[a-zA-Z_]/.test(c);
      }
    ),
    parser.many(
      parser.constrainAcceptance(
        parser.any,
        function(c) {
          return /a-zA-Z_0-9/.test(c);
        }
      )
    )
  ),
  function(result) {
    return result[0] + result[1].join('');
  }
));

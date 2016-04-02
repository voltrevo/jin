'use strict';

var parser = require('voltrevo-parser').flat;

var augmentJson = require('./augmentJson.js');
var identifier = require('./identifier.js');
var StructuredPromise = require('./StructuredPromise.js');

module.exports = function(methods) {
  var method = parser.or.apply(undefined, Object.keys(methods).map(parser.string));

  return augmentJson(function(jsonValue) {
    var jinImpl;

    var jinDefer = parser.defer('jin', function() {
      return jinImpl;
    });

    var jinImpl = parser.name('jin', parser.or(
      jsonValue,
      parser.transform(
        parser.sequence(
          method,
          parser.single('('),
          parser.list(
            jinDefer,
            parser.wrapOptionalWhitespace(
              parser.single(',')
            )
          ),
          parser.single(')')
        ),
        function(res) {
          return StructuredPromise(res[2]).then(function(args) {
            return methods[res[0]].apply(undefined, args);
          });
        }
      )
    ));

    return jinImpl;
  });
};

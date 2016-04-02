'use strict';

module.exports = function(n) {
  return (new Array(n)).fill(0).map(function(x, i) {
    return i;
  });
};

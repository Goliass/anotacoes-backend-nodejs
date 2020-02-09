// This module is for Node versions prior to 11: https://stackoverflow.com/questions/57619497/array-prototype-flat-is-not-working-in-command-line-using-node-js

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#Alternative

// to enable deep level flatten use recursion with reduce and concat
module.exports = function arrayFlat(arr, depth = 1) {
  return depth > 0 ? 
      arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? arrayFlat(val, depth - 1) : val), [])
    : arr.slice();
};
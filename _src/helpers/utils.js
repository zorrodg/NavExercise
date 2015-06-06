'use strict';

/**
 * Check if array contains item
 * @param  {Array}  arr  target
 * @param  {String} item
 * @return {Boolean}     true if found
 */
export function contains(arr = [], item = '') {
  for (let i of arr) {
    if (i === item) {
      return true;
    }
  }

  return false;
}

/**
 * Filters unique values
 * @param  {Array}  arr target
 * @return {Array}      filtered result
 */
export function unique(arr = []) {
  var result = [];

  for (let i of arr) {
    if (!contains(result, i)) {
      result.push(i);
    }
  }

  return result;
}
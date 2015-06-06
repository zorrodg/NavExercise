'use strict';

import assert from 'assert';
import * as u from './../_src/helpers/utils';

describe('Utils Testing', () => {
  let arr = [1,2,4,2,5,3,3];

  describe('Contains', () => {
    it('Should contain 3', () => assert(u.contains(arr, 3)));
    it('Should contain 5', () => assert(u.contains(arr, 5)));
    it('Should not contain "3"', () => assert.equal(u.contains(arr, '3'), false));
    it('Should not contain 40', () => assert.equal(u.contains(arr, 40), false));
  });

  describe('Unique', () => {
    arr = u.unique(arr);

    it('Should contain unique values', () => assert.deepEqual(arr, [1,2,4,5,3]))
  });

});

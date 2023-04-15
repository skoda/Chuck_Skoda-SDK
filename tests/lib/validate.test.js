const Filters = require('../../src/lib/filters');
const {
  ERR_NO_TOKEN,
  ERR_MISSING_ID,
  ERR_FIELD_STRING,
  ERR_NUM_EXPECTED,
} = require('../../src/consts');
const {
  validateId,
  validateNumber,
  validateField,
  validateToken,
} = require('../../src/lib/validate');

test('validate fns throw right errs', () => {
  expect(() => validateToken(true)).toThrowError(ERR_NO_TOKEN);
  expect(() => validateId(4)).toThrowError(ERR_MISSING_ID);
  expect(() => validateField(null)).toThrowError(ERR_FIELD_STRING);
  expect(() => validateNumber(NaN)).toThrowError(ERR_NUM_EXPECTED);
});

// Module to validate input
const {
  ERR_NO_TOKEN,
  ERR_MISSING_ID,
  ERR_FIELD_STRING,
  ERR_NUM_EXPECTED,
} = require('../consts');

const isString = (val) => val && typeof val === 'string';

module.exports = {
  validateId: (id) => {
    if (!isString(id)) {
      throw new Error(ERR_MISSING_ID);
    }
  },

  validateNumber: (num) => {
    if ((!num && num !== 0) || typeof num !== 'number') {
      throw new Error(ERR_NUM_EXPECTED);
    }
  },

  validateField: (field) => {
    if (!isString(field)) {
      throw new Error(ERR_FIELD_STRING);
    }
  },

  validateToken: (token) => {
    if (!isString(token)) {
      throw new Error(ERR_NO_TOKEN);
    }
  },
};

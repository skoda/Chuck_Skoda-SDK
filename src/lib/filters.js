// Filter generation for The One API endpoints
const { validateNumber, validateField } = require('./validate');
const { DEFAULT_PAGING_LIMIT } = require('../consts');

const inequalityFilter = (filters, field, val, op) => {
  validateNumber(val);
  validateField(field);
  filters.push(`${field}${op}${val}`);
};

class Filters {
  constructor() {
    this.filters = [];
    this.paging = {
      limit: `limit=${DEFAULT_PAGING_LIMIT}`,
    };
  }

  //
  // Match field against any or none of given value(s)
  any(field, ...vals) {
    validateField(field);
    this.filters.push(`${field}=${vals.join(',')}`);
    return this;
  }

  none(field, ...vals) {
    validateField(field);
    this.filters.push(`${field}!=${vals.join(',')}`);
    return this;
  }

  //
  // Exist (not exist) on field
  exist(field) { validateField(field); this.filters.push(field); return this; }

  dne(field) { validateField(field); this.filters.push(`!${field}`); return this; }

  //
  // Numeric inequality filters
  gt(field, val) { inequalityFilter(this.filters, field, val, '>'); return this; }

  gte(field, val) { inequalityFilter(this.filters, field, val, '>='); return this; }

  lt(field, val) { inequalityFilter(this.filters, field, val, '<'); return this; }

  lte(field, val) { inequalityFilter(this.filters, field, val, '<='); return this; }

  //
  // Pagination filters
  page(num) { validateNumber(num); this.paging.page = `page=${num}`; return this; }

  limit(num) { validateNumber(num); this.paging.limit = `limit=${num}`; return this; }

  offset(num) { validateNumber(num); this.paging.offset = `offset=${num}`; return this; }

  //
  // Concatenate and return the query string
  get queryString() {
    return `?${[...this.filters, ...Object.values(this.paging)].join('&')}`;
  }
}

module.exports = Filters;

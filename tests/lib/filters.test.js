const Filters = require('../../src/lib/filters');
const { DEFAULT_PAGING_LIMIT, ERR_NUM_EXPECTED } = require('../../src/consts');

test('default filter has limit', () => {
  expect((new Filters()).queryString).toBe(`?limit=${DEFAULT_PAGING_LIMIT}`);
});

test('inequality fields fail non-numbers', () => {
  const filters = new Filters();
  expect(() => filters.gt('height', 'hello')).toThrowError(ERR_NUM_EXPECTED);
  expect(() => filters.gte('height', {})).toThrowError(ERR_NUM_EXPECTED);
  expect(() => filters.lt('height', [])).toThrowError(ERR_NUM_EXPECTED);
  expect(() => filters.lte('height', false)).toThrowError(ERR_NUM_EXPECTED);
});

test('multiple filters proper query string', () => {
  const filters = new Filters();
  filters
    .any("race","dwarf","elf",)
    .dne("ring")
    .gt("score",65)
    .limit(10)
    .offset(5);
  expect(filters.queryString).toBe("?race=dwarf,elf&!ring&score>65&limit=10&offset=5");
});

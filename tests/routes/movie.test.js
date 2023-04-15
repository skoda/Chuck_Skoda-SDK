const request = require('../../src/lib/toaRequest')("fake-token");
const { API_BASE_URL } = require('../../src/consts');
const Filter = require('../../src/lib/filters')
const {
  movies,
  movie,
  quotes
} = require('../../src/routes/movie')(request);

const emptyFilter = (new Filter());
delete emptyFilter.paging.limit;

const expectedHeaders = {
  headers:
  {
    Accept: 'application/json',
    Authorization: 'Bearer fake-token'
  }
};

test('movies hits correct endpoint', async () => {
  const expectedUrl = `${API_BASE_URL}movie?`;
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({ json: () => Promise.resolve({}) })
  );

  const response = await movies(emptyFilter);

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(expectedUrl, expectedHeaders);

  global.fetch.mockRestore();
});

test('movie hits correct endpoint', async () => {
  const expectedUrl = `${API_BASE_URL}movie/bogus-id?`;  
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({ json: () => Promise.resolve({}) })
  );

  const response = await movie('bogus-id', emptyFilter);

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(expectedUrl, expectedHeaders);

  global.fetch.mockRestore();
});

test('quotes hits correct endpoint', async () => {
  const expectedUrl = `${API_BASE_URL}movie/bogus-id/quote?`;
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({ json: () => Promise.resolve({}) })
  );

  const response = await quotes('bogus-id', emptyFilter);

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(expectedUrl, expectedHeaders);

  global.fetch.mockRestore();
});

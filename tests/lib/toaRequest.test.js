const request = require('../../src/lib/toaRequest')("fake-token");
const { API_BASE_URL } = require('../../src/consts');
const Filter = require('../../src/lib/filters')

test('request calls fetch', async () => {
  const expectedUrl = `${API_BASE_URL}movie${(new Filter()).queryString}`;
  const expectedHeaders = {
    headers:
    {
      Accept: 'application/json',
      Authorization: 'Bearer fake-token'
    }
  };
  const mockResponse = {data: 'mock data'};
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    })
  );

  const response = await request("movie");

  expect(response).toEqual(mockResponse);
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(expectedUrl, expectedHeaders);

  global.fetch.mockRestore();
});

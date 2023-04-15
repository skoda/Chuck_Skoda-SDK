// Module for making requests to
// The One API: https://the-one-api.dev/documentation

const { API_BASE_URL } = require('../consts');
const { validateToken } = require('./validate');
const Filter = require('./filters');

const toaRequest = (apiAccessToken) => {
  const token = apiAccessToken || process.env.THE_ONE_API_ACCESS_TOKEN;
  const headers = { Accept: 'application/json', Authorization: `Bearer ${token}` };

  validateToken(token);

  return async (endpoint, filters = new Filter()) => {
    const url = `${API_BASE_URL}${endpoint}${filters.queryString}`;
    const resp = await fetch(url, { headers });
    return resp.json();
  };
};

module.exports = toaRequest;

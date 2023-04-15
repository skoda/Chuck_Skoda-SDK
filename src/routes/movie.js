// Movie endpoints on The One API
const { validateId } = require('../lib/validate');

module.exports = (request) => {
  const movies = async (filters) => request('movie', filters);

  const movie = async (id, filters) => {
    validateId(id);
    return request(`movie/${id}`, filters);
  };

  const quotes = async (id, filters) => {
    validateId(id);
    return request(`movie/${id}/quote`, filters);
  };

  return {
    movies,
    movie,
    quotes,
  };
};

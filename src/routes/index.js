// Index file of all supported routes
// Passes in authenticated request function
const movie = require('./movie');

module.exports = (request) => ({
  ...movie(request),
});

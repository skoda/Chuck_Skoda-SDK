const toaRequest = require('./src/lib/toaRequest');
const Filter = require('./src/lib/filters');
const Routes = require('./src/routes');

const DataOfTheRings = (apiAccessToken) => {
  const request = toaRequest(apiAccessToken);
  const routes = Routes(request);

  return {
    newFilter: () => (new Filter()),
    ...routes,
  };
};

module.exports = DataOfTheRings;

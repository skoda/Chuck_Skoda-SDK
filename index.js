const errMsg = {
  NO_TOKEN: "Must provide a valid access token!",
  NO_PAGING: "Paging and limits are disallowed in filters!",
  MISSING_ID: "Must provide a valid movie id!",
};

const DataOfTheRings = (
  apiAccessToken,
  apiBaseUrl = 'https://the-one-api.dev/v2/'
) => {
  apiAccessToken = apiAccessToken || process.env.THE_ONE_API_ACCESS_TOKEN;

  if (!apiAccessToken) {
    throw new Error(errMsg.NO_TOKEN);
  }

  const request = async (endpoint) => {
    const url = `${apiBaseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiAccessToken}`,
        Accept: 'application/json'
      }
    });

    return response.json();
  }

  const validateId = (id) => {
    if (!id || typeof id !== 'string') {
      throw new Error(errMsg.MISSING_ID);
    }
  }

  const validateFilters = (filters) => {
    if (filters.find(f => f.startsWith('limit=') || f.startsWith('page='))) {
      throw new Error(errMsg.NO_PAGING);
    }
  }

  const filterParams = (filters) => {
    if (filters.length) {
      return `?${filters.join(',')}`
    }
    return '';
  }

  const movies = async (...filters) => {
    validateFilters(filters);
    return request(`movie${filterParams(filters)}`).docs;
  }

  const movie = async (id, ...filters) => {
    validateId(id);
    validateFilters(filters);
    return request(`movie/${id}${filterParams(filters)}`).docs[0];
  }

  const quotes = async (id, ...filters) => {
    validateId(id);
    validateFilters(filters);

    // Two Towers has juuuuust too many quotes.
    filters.push('limit=1000');
    let finished = false;
    let page = 1;
    const out = [];

    do {
      const params = filterParams([...filters, `page=${page++}`]);
      const resp = await request(`movie/${id}/quote${params}`);
      out.push(...resp.docs);
      finished = (resp.page >= resp.pages);
    } while (!finished)
    
    return out;
  }
  
  return {
    movies,
    movie,
    quotes,

  }
};

// ----- TESTING ------
const DOTR = DataOfTheRings(API_KEY);
async function test() {
  console.log((await DOTR.quotes('5cd95395de30eff6ebccde5b')).length);
}
test();
// ---- END TESTING ---

exports = module.exports = DataOfTheRings;

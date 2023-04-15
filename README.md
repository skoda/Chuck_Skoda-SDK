# Data Of The Rings
Coding Challenge SDK

This SDK is for a coding challenge. It lets you access an API for data on movies from a popular fantasy franchise.

Once you've installed the module...

## Get a Token
Do this [here](https://the-one-api.dev/sign-up).

## Instantiate the SDK
```
const DOTR = require('data-of-the-rings')('<your-access-token>');
```
You can alternatively set your token in your environment as `THE_ONE_API_ACCESS_TOKEN`:
```
const DOTR = require('data-of-the-rings')();
```

## Make Requests

```
async function askTheQuestion() {
  const movies = await DOTR.movies();
  return `Have you seen all these movies:\n${movies.map(m => m.name).join(', ')}?`;
}
```

## Currently Available API
```
// Returns data around LOTR films
movies(filters: <optional, Filter object>)

// Returns a specific films data,
// requires an _id for the film from a call to `movies`
movie(id: <required, _id string>, filters: <optional, Filter object>)

// Return quotes from a specified film,
// As of this writing quotes only exist for the original LOTR Trilogy of films
quotes(id: <required, _id string>, filters: <optional, Filter object>)
```

## Filter Results
Results can be filtered in a number of ways. Start by creating a filter object.
```
const myFilters = DOTR.newFilter();
```
And then add a filter, you can chain as many as you'd like:
```
myFilters.any("race", "hobbit", "dwarf").exists("spouse");
```
Then pass `myFilters` as the optional filters parameter in any of the calls above.

## Supported Filters
```
.any(field, ...vals)  // Matches when the fields value equals any of the subsequent params
.none(field, ...vals) // Matches when the fields value doesn't equal any subsequent params

.exist(field) // Matches when the field exists on an object
.dne(field)   // Matches when the field does not exist

.gt(field, val)   // Matches when fields value is strictly greater than val
.gte(field, val)  // Matches when fields value is greater or equal to val
.lt(field, val)   // Matches when fields value is strictly less than val
.lte(field, val)  // Matches when fields value is less than or equal to val
```

## Paging
You can also control paging behavior for calls using a filter object
```
.page(num)    // Which page of data do you want to request
.limit(num)   // How many documents per page (defaults to 100)
.offset(num)  // How many documents should we offset from the beginning
```

## Thanks!
Have fun! Don't go putting on any rings with fiery script on them.

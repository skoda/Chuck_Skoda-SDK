# SDK Design

## Organization
The folder structure is intended to keep things organized. The two top level folders for the project being `src` and `test`. Underneath `src`, it's broken down into `lib` for internal modules, and `routes` for establishing connections to endpoints in the API. New files could be added under the routes directory following the pattern established by `routes/movie.js`, and would be picked up by the SDK by being added to `routes/index.js`.

## Lightweight and Simple
Running on top of a well designed API, `data-of-the-rings` core has no package dependencies. Only dev dependencies are in the project for testing and linting. Web requests are handled using `fetch`.

## Improved Filtering
The filters covered in the APIs Documentation seemed a bit cumbersome, so I made an attempt at simplifying this with a filtering object that uses method chaining to build a single object containing any number of filtering options.

## Testing and Linting
Tests are laid out per module, where the `test` folder reflects the same directory structure as `src`. ESLint is setup on the project to enforce coding standards, using the `airbnb-base` standard with no alterations.

## What Could Be Better
Truth be told, there isn't a ton of functionality here. I don't have an exhaustive list of fields, so validation is very simplified where I did any. I'm leaving error handling largely to the host application. It's not clear yet how people could use this, and in what instances it would make sense to handle errors differently than allowing them to bubble up. Currently, the project isn't setup to support import, as many more modern SDKs do. This format allows for compatibility further back into older versions of Node however. That said, adding the APIs remaining routes wouldn't be very complicated, and we could sit new functionality on top of them. Like an LotR "Quote of the Day" or similar.

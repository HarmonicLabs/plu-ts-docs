# plu-ts-docs

Documentation for the [`plu-ts`](https://github.com/HarmonicLabs/plu-ts) library

### Installing
```
npm install
```

### Local Development

IMPORTANT

Before running the application make sure you have a `.env` file in the root of the project specifying the following environment variables

```
ALGOLIA_APP_ID=""
ALGOLIA_API_KEY=""
ALGOLIA_INDEX_NAME=""
```

`ALGOLIA_APP_ID` and `ALGOLIA_API_KEY` are present on your application overview in the algolia dashboard

`ALGOLIA_INDEX_NAME` is the name of the index you find on the top nav bar if you click "search" in the dashboard

Then you can run:

```
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
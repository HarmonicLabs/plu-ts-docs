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
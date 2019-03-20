## React SSR Kit

![XhgJKxh.png](https://i.imgur.com/XhgJKxh.png)

## Table of contents

[Project Structure](#project-structure)

[Installation](#installation)

[Commands](#commands)

[Example API](#example-api)

[Configuration](#configuration)

[Packages Incorporated](#packages-incorporated)

[Known Issues](#known-issues)

## Project Structure

<details>
<summary>Click to expand project structure</summary>
<pre><code>
├── envs
|   └── index.js
|
├── config
|   ├── entry.js
|   ├── hooks.js
|   ├── paths.js
|   ├── plugins.js
|   └── rules.js
|
├── public
|   ├── assets
|   ├── favicon.ico
|   ├── loadable-assets.json
|   └── webpack-assets.json
|
├── src
|   ├── actions
|   ├── components
|   ├── containers
|   ├── images
|   ├── pages
|   ├── reducers
|   ├── root
|   ├── routes
|   ├── store
|   ├── styles
|   |   ├── assets
|   |   ├── extensions
|   |   ├── globals
|   |   ├── variables
|   |   └── styles.js
|   |
|   ├── types
|   ├── utils
|   |   ├── client
|   |   |   ├── jest
|   |   |   |   ├── assetMock.js
|   |   |   |   └── setup.js
|   |   |   ├── mocks
|   |   |   ├── axiosConfig.js
|   |   |   ├── renderApp.js
|   |   |   └── tests.js
|   |   |
|   |   └── server
|   |       ├── middlewares.js
|   |       ├── renderHtml.js
|   |       ├── serveProdAssets.js
|   |       ├── serveReact.js
|   |       ├── setupDevServer.js
|   |       └── startServer.js
|   |
|   ├── client.js
|   └── server.js
|
├── index.js
├── postcss.config.js
└── webpack.babel.js
</code></pre>
</details>
<br />

## Installation

1 - Clone the boilerplate repository.

```
 git clone git@github.com:mattcarlotta/react-ssr-kit.git
```

2 - Run `yarn install` to install dependencies.

3 - While at the application's root directory, start the server by running `yarn dev`.

## Commands

| `yarn <command>` | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| `dev`            | Starts a development server at `localhost:3000`.                         |
| `start`          | Starts a production server at `localhost:8080` (must run `build` first). |
| `build`          | Compiles application to a `public` folder.                               |
| `analyze`        | Compiles a chunk distribution chart for review.                          |
| `lint:js`        | Lint all `.js` and `.scss` files.                                        |
| `lint:js`        | Lint all `.js` files.                                                    |
| `lint:styles`    | Lint all `.scss` files.                                                  |
| `remove:api`     | Removes the `api` folder, its related deps, and updates `package.json`.  |
| `test`           | Runs all `.test.js` files once and produces a coverage.                  |
| `test:watch`     | Runs and watches all `.test.js` files.                                   |
| `test:coverage`  | Runs a coverage report for `.test.js` files.                             |
| `clean`          | Removes all compiled code and coverage reports.                          |
| `clean:build`    | Removes all compiled code.                                               |
| `clean:test`     | Removes all coverage reports.                                            |

## Example API

Provided in this boilerplate is an example of how to integrate a RESTFUL API (utilizing MongoDB) with SSR. The main advantage of integrating an API with SSR is to avoid using <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">CORS</a>. As such, this pre-configured setup can be utilized or removed.

If you wish to utilize the API:

- <a href="https://docs.mongodb.com/manual/installation/#mongodb-community-edition">Install MongoDB</a> and make sure the service is up and running.
- Navigate to `http://localhost:3000/users` to interact with the API from the client-side.

If you wish to remove the API:

- Run `yarn remove:api` to remove the API and its dependencies.

## Configuration

<details>
<summary>Click to expand configuration</summary>
<pre><code>
- .browserslistrc: config to share target browsers between different front-end tools.
- .estlintignore: eslist config to ignore the files and folders specified.
- .eslintrc.js: eslint config.
- babel.config.js: babel config (note that main folders are aliased in <a href="https://github.com/mattcarlotta/react-ssr-kit/blob/master/babel.config.js">here</a>).
- jest.json: jest config.
- nodemon.json: nodemon config.
- postcss.config.js: postcss config.
- stylint.config.js: stylelint config.
- envs/index.js: node and webpack environment variables.
- public/assets: contains compiled, production build `.css`, `.map`, `.js`, and `.gz` files.
- public/loadable-assets.json: contains development file chunks.
- public/webpack-assets.json: contains production file chunks.
- src/client.js: client-side React setup.
- src/server.js: express server.
- src/styles/assets: media assets imports.
- src/styles/extensions: partial shared extensions.
- src/styles/globals: global asset imports (see notes in <a href="https://github.com/mattcarlotta/react-ssr-kit/blob/master/src/styles/globals/globals.scss#L1-L30">global.scss</a> for important information).
- src/styles/variables: partial shared variables.
- src/styles/styles.scss: indexed partial files for easier sharing (see notes in <a href="https://github.com/mattcarlotta/react-ssr-kit/blob/master/src/styles/styles.scss#L1-L39">styles.scss</a> for important information).
- src/utils/client/jest/assetMock.js: jest mocks for media imports.
- src/utils/client/jest/setup.js: jest test setup environment (see notes in <a href="https://github.com/mattcarlotta/react-ssr-kit/blob/master/src/utils/client/jest/setup.js#L13-L21">setup.js</a> for important information).
- src/utils/client/mocks: client-side global mocks for testing.
- src/utils/client/axiosConfig.js: client-side axios setup (must point to the correct `HOST`/`PORT` for the running environment).
- src/utils/client/renderApp.js: client-side React setup.
- src/utils/client/tests.js: custom functions tests to leverage `mount`, `shallow`, and `createStoreFactory` (see notes in <a href="https://github.com/mattcarlotta/react-ssr-kit/blob/master/src/utils/client/tests.js">tests.js</a> for utilization).
- src/utils/client/middlewares.js: express middlewares.
- src/utils/server/renderHtml.js: factory function to rewrite client-side DOM structure.
- src/utils/server/serveProdAssets.js: serves compiled webpack production assets.
- src/utils/server/serveReact.js: server side rendering setup to serve React to the client-side.
- src/utils/server/setupDevServer.js: webpack setup for client-side compilation and hot module replacement.
- src/utils/server/startServer.js: starts express server.
- config/entry.js: webpack entry variables.
- config/hooks.js: webpack hooks for handling SASS/CSS and media imports.
- config/paths.js: webpack config folder paths.
- config/plugins.js: webpack plugins required for development or production.
- config/rules.js: webpack rules testing.
- webpack.babel.js: webpack config for both development and production environments (must be `.babel.js` to accept ES6 `import/export`).
</code></pre>
</details>
<br />

## Packages Incorporated

To see the latest package versions, please check out the <a href="https://github.com/mattcarlotta/react-ssr-kit/blob/master/package.json#L109-L218">package.json</a>. If you run into any issues, please fill out an issue report <a href="https://github.com/mattcarlotta/react-ssr-kit/issues">here</a>.

<details>
<summary>Click to expand brief overview of packages</summary>
<pre><code>
- <a href="https://github.com/axios/axios">Axios</a>
- <a href="https://github.com/babel/babel">Babel</a>
- <a href="https://github.com/webpack-contrib/css-loader">CSS Loader</a>
- <a href="https://github.com/supasate/connected-react-router">Connected React Router</a>
- <a href="https://github.com/eslint/eslint/">Eslint</a>
- <a href="http://airbnb.io/enzyme/">Enzyme</a>
- <a href="https://github.com/expressjs/express">Express</a>
- <a href="https://github.com/geowarin/friendly-errors-webpack-plugin">Friendly Errors Webpack Plugin</a>
- <a href="https://github.com/ReactTraining/history">History</a>
- <a href="https://github.com/typicode/husky">Husky</a>
- <a href="https://github.com/facebook/jest">Jest</a>
- <a href="https://github.com/lodash/lodash">Lodash</a>
- <a href="https://github.com/webpack-contrib/mini-css-extract-plugin">Mini CSS Extract Plugin</a>
- <a href="https://github.com/expressjs/morgan">Morgan</a>
- <a href="https://github.com/prettier/prettier">Prettier</a>
- <a href="https://github.com/facebook/prop-types">PropTypes</a>
- <a href="https://github.com/facebook/react">React</a>
- <a href="https://github.com/nfl/react-helmet">React Helmet</a>
- <a href="https://github.com/gaearon/react-hot-loader">React Hot Loader</a>
- <a href="https://github.com/jamiebuilds/react-loadable">React Loadable</a>
- <a href="https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom">React Router Dom</a>
- <a href="https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config">React Router Config</a>
- <a href="https://github.com/reduxjs/redux">Redux</a>
- <a href="https://github.com/zalmoxisus/redux-devtools-extension">Redux DevTools Extension</a>
- <a href="https://github.com/reduxjs/redux-thunk">Redux Thunk</a>
- <a href="https://github.com/webpack-contrib/sass-loader">Sass Loader</a>
- <a href="https://stylelint.io/">Stylelint</a>
- <a href="https://github.com/kristerkari/stylelint-scss">Stylelint-SCSS</a>
- <a href="https://github.com/stylelint/stylelint-config-recommended">Stylelint-Config-Recommended</a>
- <a href="https://github.com/webpack-contrib/style-loader">Style Loader</a>
- <a href="https://github.com/webpack/webpack">Webpack</a>
- <a href="https://www.npmjs.com/package/webpackbar">Webpackbar</a>
- <a href="https://github.com/webpack/webpack-dev-middleware">Webpack Dev Middleware</a>
- <a href="https://github.com/webpack-contrib/webpack-hot-middleware">Webpack Hot Middleware</a>
</code></pre>
</details>
<br />

## Known Issues

⚠️ React Hot Loader throws a warning if you use `react-dom` instead of `@hot-loader/react-dom`: <a href="https://stackoverflow.com/a/54816859/7376526">react-🔥-dom patch is not detected. React 16.6+ features may not work.</a>
By default, React Hot loader has been disabled. If you wish to utilize React Hot Loader, then follow these <a href="https://github.com/hot-loader/react-dom#webpack">instructions to resolve hot-loader/react-dom</a> inside of <a href="https://github.com/mattcarlotta/react-ssr-kit/blob/master/webpack.babel.js#L55-L59">webpack.babel.config</a>. In addition, in `src/components/app/App.js` you must uncomment <a href="https://github.com/mattcarlotta/react-ssr-kit/blob/master/src/components/App/App.js#L5">line 5</a> and <a href="https://github.com/mattcarlotta/react-ssr-kit/blob/master/src/components/App/App.js#L44">line 29</a>; as well as, in `src/root` you must uncomment <a href="https://github.com/mattcarlotta/react-ssr-kit/blob/master/src/root/index.js#L4">line 4</a> and wrap <a href="https://github.com/mattcarlotta/react-ssr-kit/blob/master/src/root/index.js#L10-L12">lines 10-12<a/> with an `<AppContainer>...</AppContainer>`. If the process is already running, you must stop and restart it.

⚠️ ReactLoadablePlugin throws two deprecation warnings during compilation: <a href="https://github.com/jamiebuilds/react-loadable/pull/140">DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead. DeprecationWarning: Chunk.forEachModule: Use for(const module of chunk.modulesIterable) instead.</a>

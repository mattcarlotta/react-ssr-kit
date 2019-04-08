module.exports = api => {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: "core-js@3"
      }
    ],
    "@babel/preset-react"
  ];

  const plugins = [
    [
      "module-resolver",
      {
        alias: {
          envs: "./envs",
          actions: "./src/actions",
          components: "./src/components",
          containers: "./src/containers",
          images: "./src/images",
          reducers: "./src/reducers",
          root: "./src/root",
          routes: "./src/routes",
          store: "./src/store",
          styles: "./src/styles",
          types: "./src/types",
          utils: "./src/utils",
          views: "./src/views"
        }
      }
    ],
    "react-loadable/babel",
    "dynamic-import-node",
    "lodash",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import"
  ];

  const env = {
    production: {
      plugins: ["transform-remove-console", "transform-react-remove-prop-types"]
    }
  };

  return {
    presets,
    plugins,
    env
  };
};

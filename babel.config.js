module.exports = api => {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage"
      }
    ],
    "@babel/preset-react"
  ];

  const plugins = [
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

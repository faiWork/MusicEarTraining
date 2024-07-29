const { override, addWebpackPlugin } = require("customize-cra");
const path = require("path");
const DefinePlugin = require("webpack").DefinePlugin;

module.exports = override(
  addWebpackPlugin(
    new DefinePlugin({
      "process.env.PUBLIC_URL": JSON.stringify(process.env.PUBLIC_URL || "/"),
    })
  ),
  (config, env) => {
    config.resolve.plugins = config.resolve.plugins.filter(
      (plugin) => plugin.constructor.name !== "ModuleScopePlugin"
    );

    config.module.rules[1].oneOf.unshift({
      test: /\.(wav|mp3|flac|aac)$/,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash:8].[ext]",
      },
    });

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@audio": path.resolve(__dirname, "src/sound/piano-88-notes"),
        },
      },
    };
  }
);
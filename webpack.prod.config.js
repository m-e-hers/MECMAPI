const common = require("./webpack.config.js");

module.exports = {
  ...common,
  entry: {
    content: './src/content/bundler.js',
  },
  output: {
      filename: '[name].bundle.js',
      path: __dirname + '/dist/pro',
  },
  mode: 'production',
  devtool: 'inline-cheap-module-source-map',
};
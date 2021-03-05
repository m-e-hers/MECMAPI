const common = require("./webpack.config.js");

module.exports = {
  ...common,
  entry: {
    content: './src/content/bundler.js',
  },
  output: {
      filename: '[name].bundle.js',
      path: __dirname + '/dist/dev',
  },
  mode: 'development',
  devtool: 'eval-source-map',
};
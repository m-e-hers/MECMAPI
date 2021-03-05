module.exports = {
    entry: {
      content: './src/content/bundler.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist',
    },
  };
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  entry: './src/class-bst.js',
  output: {
    library: "BinarySearchTree",
    libraryTarget: "umd",
    filename: './dist/class-bst.dist.js'
  },
  plugins: [
    new UglifyJsPlugin()
  ]
}

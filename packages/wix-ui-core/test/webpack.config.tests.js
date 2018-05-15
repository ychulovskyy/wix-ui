const path = require('path');
const StylableWebpackPlugin = require('stylable-webpack-plugin');

module.exports = {
  entry: './entry.js',
  context: path.resolve(__dirname),
  mode: 'development',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    rules: [
       // mocha loader
       {
        test: /spec\.tsx$/,
        use: 'mocha-loader',
        exclude: /node_modules/,
      },
    // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        loader: "ts-loader"
      }
    ],
  },
  plugins: [
    new StylableWebpackPlugin(),
  ]
}
const webpack = require('webpack');
const path = require('path');

const SRC_PATH = path.join(__dirname, 'src', 'index.js');
const BUILD_PATH = path.join(__dirname, 'public');

const DashboardPlugin = require('webpack-dashboard/plugin');

const ENV = process.env.NODE_ENV;

const getPlugins = (environment) => {
  if (environment === 'production') {
    return [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          screw_ie8: true,
          warnings: false,
        },
      }),
    ];
  }

  return [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new DashboardPlugin(),
  ];
};

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: SRC_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js'],
    alias: {},
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel',
      },
    ],
  },

  plugins: getPlugins(ENV),
};

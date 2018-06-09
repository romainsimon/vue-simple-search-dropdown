const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const VueLoader = require('vue-loader');
const merge = require('webpack-merge');
const path = require('path');

const config = {
  output: {
    path: path.resolve(__dirname + '/dist/'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          rules: {
            scss: ExtractTextPlugin.extract({
              use: 'css-loader!sass-loader',
              fallback: 'vue-style-loader'
            }),
            sass: ExtractTextPlugin.extract({
              use: 'sass-loader',
              fallback: 'vue-style-loader'
            })
          }
        },
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  plugins: [
    new VueLoader.VueLoaderPlugin()
  ]
};

module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'vue-simple-search-dropdown.min.js',
      libraryTarget: 'window',
      library: 'Dropdown',
    }
  }),
  merge(config, {
    entry: path.resolve(__dirname + '/src/Dropdown.vue'),
    output: {
      filename: 'vue-simple-search-dropdown.js',
      libraryTarget: 'umd',
      library: 'vue-simple-search-dropdown',
      umdNamedDefine: true
    }
  })
];

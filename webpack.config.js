const { resolve } = require('path');

const webpack = require('webpack');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// PostCSS plugins
const cssnext = require('postcss-cssnext');

// webpack config helpers
const { getIfUtils, removeEmpty, combineLoaders } = require('webpack-config-utils');

module.exports = (env) => {
  const { ifProd, ifNotProd } = getIfUtils(env);

  return {
    context: resolve('src'),
    entry: {
      app: './main.tsx'
    },
    output: {
      filename: '[name].[hash].js',
      path: resolve('dist'),
      // Include comments with information about the modules.
      pathinfo: ifNotProd(),
    },

    resolve: {
        extensions: [
            '',
            '.js',
            '.ts',
            '.tsx'
        ]
    },

    devtool: ifProd('source-map', 'cheap-module-source-map'),

    module: {
      loaders: [
        // Typescript
        { test: /\.tsx?$/, loaders: [ 'awesome-typescript-loader' ], exclude: /node_modules/ },
        // CSS
        {
          test: /\.css$/,
          loaders: ifNotProd(
            combineLoaders( [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                query: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                  sourceMap: true
                }
              },
              { loader: 'postcss-loader' }
            ] ),
            ExtractTextPlugin.extract( {
              fallbackLoader: 'style-loader',
              loader: combineLoaders( [
                {
                  loader: 'css-loader',
                  query: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                  }
                },
                { loader: 'postcss-loader' }
              ] )
            } )
          )
        }
      ],
    },

    // This is required, when using Hot Code Replacement between multiple calls to the compiler.
    recordsPath: resolve(__dirname, './tmp/webpack-records.json'),

    plugins: removeEmpty([

      // Add nice progress bar
      new ProgressBarPlugin(),

      new HtmlWebpackPlugin({
        template: resolve('src','index.html')
      }),

      // Set NODE_ENV to enable production react version
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: ifProd('"production"', '"development"')
        }
      }),

      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
      })),

      ifProd(new webpack.optimize.CommonsChunkPlugin({
        minChunks: Infinity,
        name: 'inline',
      })),

      // We use ExtractTextPlugin so we get a seperate CSS file instead
      // of the CSS being in the JS and injected as a style tag
      ifProd( new ExtractTextPlugin( '[name].[contenthash].css' ) ),

      // Deduplicate node modules dependencies
      ifProd(new webpack.optimize.DedupePlugin()),

      // Default webpack build options
      ifProd(new webpack.LoaderOptionsPlugin({
        debug: false
      })),

      // Uglify bundles
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        output: {
          comments: false
        }
      }))

    ]),

    // plugins config
    postcss: [
      cssnext({ // Allow future CSS features to be used, also auto-prefixes the CSS...
        browsers: ['last 2 versions', 'IE > 10'], // ...based on this browser list
      })
    ]
  }
};

const path = require('path');
const webpack = require('webpack');

const angularInjections = path.resolve(__dirname, 'src', 'require-angular-injections.js');
const chaiPath = path.resolve(__dirname, 'node_modules', 'chai/chai.js');
const lodashPath = path.resolve(__dirname, 'node_modules', 'lodash', 'dist', 'lodash.js');
const materialAdmin = path.resolve(__dirname, 'node_modules', 'esn-frontend-common-libs', 'src', 'frontend', 'js', 'material.js');
const chartJs = path.resolve(__dirname, 'node_modules', 'esn-frontend-common-libs', 'src', 'frontend', 'components', 'Chart.js/Chart.js');

const pugLoaderOptions = {
  root: `${__dirname}/node_modules/esn-frontend-common-libs/src/frontend/views`
};

module.exports = {
  mode: 'development',
  entry: './src/index.test.js',
  devtool: 'source-map',
  output: {
    filename: 'bundle-test.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.ProvidePlugin({
      chai: chaiPath,
      Chart: chartJs,
      materialAdmin,
      _: lodashPath,
      'window.angularInjections': angularInjections
    }),
    new webpack.IgnorePlugin({ resourceRegExp: /codemirror/ }) // for summernote
  ],
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /all\.less$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.pug$/i,
        exclude: [
          /assets\/index\.pug$/
        ],
        use: [
          {
            loader: 'apply-loader'
          },
          {
            loader: 'pug-loader',
            options: pugLoaderOptions
          }
        ]
      }
    ]
  }
};

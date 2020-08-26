'use strict';

const webpackConfig = require('../../webpack.test');

module.exports = function(config) {
  const singleRun = process.env.SINGLE_RUN !== 'false';

  config.set({
    basePath: '../../',
    files: [
      'src/index.test.js'
    ],
    frameworks: ['mocha', 'sinon-chai'],
    colors: true,
    singleRun: true,
    autoWatch: true,
    singleRun,
    browsers: ['FirefoxHeadless'],
    customLaunchers: {
      FirefoxHeadless: { base: 'Firefox', flags: ['--headless'] }
    },
    reporters: ['spec'],
    preprocessors: {
      'src/index.test.js': ['webpack'],
      'frontend/app/**/!(*spec).js': ['webpack']
    },
    plugins: [
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-spec-reporter',
      'karma-webpack',
      'karma-sinon-chai'
    ],

    webpack: webpackConfig
  });
};

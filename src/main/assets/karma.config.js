const KarmaWebpackPlugin = require('karma-webpack');
const KarmaJasminPlugin = require('karma-jasmine');
const KarmaSpecReporterPlugin = require('karma-spec-reporter');
const KarmaPhantomjsLauncherPlugin = require('karma-phantomjs-launcher');

// Default unit test configuration
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    colors: true,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true,
    failOnEmptyTestSuite: false,
    autoWatchBatchDelay: 300,
    files: [{
      pattern: '!(node_modules)/**/*.spec.js',
      watched: false,
      served: true,
      included: true
    }],
    reporters: [
      'spec'
    ],
    preprocessors: {
      '!(node_modules)/**/*.spec.js': ['webpack']
    },
    plugins: [KarmaWebpackPlugin, KarmaJasminPlugin, KarmaSpecReporterPlugin, KarmaPhantomjsLauncherPlugin]
  });
};
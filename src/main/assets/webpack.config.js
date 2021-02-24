const createConfigForEntries = require('ps-solution-library-webpack-common').createConfigForEntries;
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const path = require('path');

const config = createConfigForEntries({
  'view': './view/index.js',
  'config': './config/index.js'
});

config.output = {
  path: path.resolve(__dirname, `./dist`),
  filename: './[name]/bundle.js?v=[hash]', 
};

config.plugins.push(
  new HtmlWebpackExternalsPlugin({
    externals: [{
      module: 'react',
      global: 'React',
      /* entry: 'https://unpkg.com/react@16.8.3/umd/react.production.min.js' /* COMMENT OUT FOR DEV MODE */
      entry: 'https://unpkg.com/react@16.8.3/umd/react.development.js' /* COMMENT OUT FOR PRODUCTION */
    },
    {
      module: 'react-dom',
      global: 'ReactDOM',
      /* entry: 'https://unpkg.com/react-dom@16.8.3/umd/react-dom.production.min.js' /* COMMENT OUT FOR DEV MODE */
      entry: 'https://unpkg.com/react-dom@16.8.3/umd/react-dom.development.js' /* COMMENT OUT FOR PRODUCTION */
    },
    {
      module: 'react-router',
      global: 'ReactRouter',
      entry: 'https://unpkg.com/react-router@4.3.1/umd/react-router.min.js'
    },
    {
      module: 'react-router-dom',
      global: 'ReactRouterDOM',
      entry: 'https://unpkg.com/react-router-dom@4.3.1/umd/react-router-dom.min.js'
    },
    {
      module: 'react-resize-aware',
      global: 'ReactResizeAware',
      entry: 'https://unpkg.com/react-resize-aware@2.7.2/dist/index.js'
    },
    {
      module: 'react-redux',
      global: 'ReactRedux',
      entry: 'https://unpkg.com/react-redux@6.0.1/dist/react-redux.min.js'
    },
    {
      module: 'redux',
      global: 'Redux',
      entry: 'https://unpkg.com/redux@4.0.1/dist/redux.min.js'
    },
    {
      module: 'redux-form',
      global: 'ReduxForm',
      entry: 'https://unpkg.com/redux-form@8.1.0/dist/redux-form.min.js'
    },
    {
      module: '@material-ui/core',
      global: 'window["material-ui"]',
      entry: 'https://unpkg.com/@material-ui/core@3.9.2/umd/material-ui.production.min.js'
    },
    {
      module: 'jquery',
      global: 'jQuery',
      entry: 'https://unpkg.com/jquery@3.5.1/dist/jquery.js'
    }]
  })
);

config.externals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'react-router': 'ReactRouter',
  'react-router-dom': 'ReactRouterDOM',
  'react-resize-aware': 'ReactResizeAware',
  'react-redux': 'ReactRedux',
  'redux': 'Redux',
  'redux-form': 'ReduxForm',
  '@material-ui/core': 'window["material-ui"]'
};

// To turn off minification - comment out when deploying to Production
 config.plugins = config.plugins.filter(function(plugin){
    return !(plugin.constructor.toString().indexOf('UglifyJsPlugin') > 0);
 });

module.exports = config;
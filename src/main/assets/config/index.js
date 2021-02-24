import React, { Component, Suspense } from 'react';
import ReactDOM from 'react-dom';
import ResizeAware from 'react-resize-aware';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { i18n, redux } from 'ps-solution-library-ui-common';

// this needs to be included before any components so we can dynamically set the runtime public path for webpack
import '../publicPath';

// import theme and colors
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import defaultMuiTheme from 'ps-solution-library-ui-common/ui/assets/jss/config/theme'; /* COMMENT OUT IF CUSTOMZIING DEFAULT THEME */
/* import customerMuiTheme from '../../../../../common/assets/jss/theme'; COMMENT OUT IF USING THE DEFAULT THEME */

// include routes
import routes from './routes';

// include reducers
import reducers from './reducers';

// include initialState
import initialState from './store/initialState';

// include global stylesheet
import './assets/styles/main.scss';

// include translations
import translations from '../locales';

// define store
const store = redux.configureStore(reducers, initialState);

// define theme
const theme = createMuiTheme(defaultMuiTheme);

// run dispatches
store.dispatch(redux.actions.getConfig(initialState));

// This wrapper is necessary so the height of the window will adjust along to fit the size of the rendered
// content within the App component. 
class ResizingApp extends Component {
  
  handleResize({ width, height }) {
    gadgets.window.adjustHeight();
  }

  render() {
    return (
      <ResizeAware
        onResize={this.handleResize}
        style={{ position: 'relative' }}
        onlyEvent
      >
        <I18nextProvider i18n={ i18n.getDefaultI18nextInstance(translations) }>
          <MuiThemeProvider theme={theme}>
            <Provider store={store}>
              <Suspense fallback={
                <div className="row">
                  <p className="ws-tb text-center"><span className="loader element">{i18n.t('common:global.loading')}&hellip;</span></p>
                </div>
              }>
                <Router>
                  <Switch>
                    {routes.map((prop, key) => {
                      return <Route path={prop.path} component={prop.component} key={key} />;
                    })}
                  </Switch>
                </Router>
              </Suspense>
            </Provider>
          </MuiThemeProvider>
        </I18nextProvider>
      </ResizeAware>
    );
  }
}

ReactDOM.render(<ResizingApp />, document.getElementById('config'));
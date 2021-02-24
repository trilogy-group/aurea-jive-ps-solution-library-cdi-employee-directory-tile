import React, { Suspense } from 'react';
import ReactDOM from 'react-dom'
import ResizeAware from 'react-resize-aware';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { i18n } from 'ps-solution-library-ui-common';

// this needs to be included before any components so we can dynamically set the runtime public path for webpack
import '../publicPath';

// include routes
import routes from './routes';

// include global stylesheet
import './assets/styles/main.scss';

import './assets/ratchet/css/ratchet.css';
import './assets/styles/styles.css';

// include translations
import translations from '../locales';

// This wrapper is necessary so the height of the window will adjust along to fit the size of the rendered
// content within the App component. 
class ResizingApp extends React.Component {
  
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
        </I18nextProvider>
      </ResizeAware>
    );
  }
}

ReactDOM.render(<ResizingApp />, document.getElementById('view'));
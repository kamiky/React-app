/**
 * app/modules/App/App.jsx
 *
 * Application, webpack entry file
 */

import React, {Component} from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

/* i18n (might not work with safari, !window.Intl, check later) */
import { IntlProvider, addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import en from 'react-intl/locale-data/en';
import localeData from '_app/translations'
addLocaleData([...en, ...fr]);

/* Redux store */
import { Provider } from 'react-redux'
import store from '_app/store'

/* styles */
import './main.scss'

/* components must be after the main.scss to keep order between styles */
import Layout from '_modules/Layout/Layout.jsx'
import LanguageProvider from '_modules/LanguageProvider/LanguageProvider.jsx'
import Dashboard from '_modules/Dashboard/Dashboard.jsx'
import Home from '_modules/Home/Home.jsx'

class App extends Component {
  constructor(props) {
        super(props)
    }

    render() {
      return (
          <Provider store={store}>
            <LanguageProvider>
              <Router history={browserHistory} >
                <Route path='/' component={Layout}>
                  <IndexRoute component={Home}/>
                  <Route path='/dashboard' component={Dashboard}/>
                </Route>
              </Router>
            </LanguageProvider>
          </Provider>
        )
    }
}

render(<App />, document.getElementById('app'))

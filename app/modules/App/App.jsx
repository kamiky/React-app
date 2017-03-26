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



/* components must be after the main.scss to keep order between styles */
import Layout from '_modules/Layout/Layout.jsx'
import LanguageProvider from '_modules/LanguageProvider/LanguageProvider.jsx'
import Socket from '_modules/Socket/Socket.jsx'
import Dashboard from '_modules/Dashboard/Dashboard.jsx'
import Home from '_modules/Home/Home.jsx'

/* Material Design */
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

/* temporary use of tap-event plugin by material-ui (faster than onClick) */
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { deepPurple500, cyan700, grey800, grey700 } from 'material-ui/styles/colors';

// const theme = {
//   ...darkBaseTheme,
//   palette: {
//     ...darkBaseTheme.palette,
//     primary1Color: deepPurple500,
//     primary2Color: cyan700,
//     primary3Color: cyan700,
//     accent1Color: grey700,
//     accent2Color: grey800,
//     accent3Color: grey700,
//   },
// }

// console.log('theme > ', theme)

/* styles */
import 'normalize.css/normalize.css'
import '_app/assets/styles/main.scss'

class App extends Component {
  constructor(props) {
        super(props)
    }

    render() {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <Provider store={store}>
            <LanguageProvider>
              <Socket>
                <Router history={browserHistory} >
                  <Route path='/' component={Layout}>
                    <IndexRoute component={Dashboard}/>
                    <Route path='/home' component={Home}/>
                  </Route>
                </Router>
              </Socket>
            </LanguageProvider>
          </Provider>
          </MuiThemeProvider>
        )
    }
}

render(<App />, document.getElementById('app'))

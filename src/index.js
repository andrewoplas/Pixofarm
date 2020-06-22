// Polyfills needed for IE 11 support
import 'core-js'

import moment from 'moment'
import 'moment/locale/de'
import numeral from 'numeral'
import 'numeral/locales/de'
import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import { Provider, updateIntl } from 'react-intl-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { syncHistoryWithStore } from 'react-router-redux'
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import de from 'react-intl/locale-data/de'
import es from 'react-intl/locale-data/es'
import ReactGA from 'react-ga'

import config from './config'
import router from './routes/router'
import { store, persistor } from './store'
import browserHistory from './history'
import languages from './languages'
import { getBrowserLocale } from './utils/funcs'
import { cleanupOldRegistrations } from './utils/serviceWorker'
import NotificationsContainer from './components/notifications'

import psl from 'psl';

cleanupOldRegistrations()

addLocaleData([...en, ...de, ...es])

ReactGA.initialize(config.googleAnalytics.trackingId)

const history = syncHistoryWithStore(browserHistory, store)
history.listen((location) => {
  ReactGA.pageview(location ? location.pathname : history.location.pathname)
})

const locale = localStorage.getItem('locale') ? localStorage.getItem('locale') : getBrowserLocale()
moment.locale(locale)
numeral.locale(locale)

store.dispatch(updateIntl({
  locale,
  messages: languages[locale],
}))

window.ReactGA = ReactGA

Modal.setAppElement('#root')

class App extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <Provider
        store={store}
      >
        <PersistGate loading={null} persistor={persistor}>
          <div>
            <NotificationsContainer />
            {router(browserHistory)}
          </div>
        </PersistGate>
      </Provider>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))

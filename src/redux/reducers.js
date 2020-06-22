// https://github.com/diegohaz/arc/wiki/Reducers
import camelCase from 'lodash/camelCase'
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as thunk } from 'redux-saga-thunk'
import { intlReducer as intl } from 'react-intl-redux'
import { routerReducer as routing } from 'react-router-redux'
import { composeResetReducer } from 'redux-reset-store'

const reducers = {
  form,
  intl,
  routing,
  thunk,
}

const req = require.context('.', true, /\.\/.+\/reducer\.js$/)

req.keys().forEach((key) => {
  const storeName = camelCase(key.replace(/\.\/(.+)\/.+$/, '$1'))
  reducers[storeName] = req(key).default
})

export default composeResetReducer(combineReducers(reducers))

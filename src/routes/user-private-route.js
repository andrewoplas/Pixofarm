import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import StandardLayout from '../layouts/index'
import { store } from '../store'
import { updateIntl } from 'react-intl-redux'
import languages from "../languages";
import {setCookie} from "../utils/funcs";
import config from "../config";

const isMobile = window.innerWidth < 1200;

const onLanguageChange = (oldLocale, oldLocation, langShortName) => {
  const locale = langShortName
  
  if (isMobile) {
    localStorage.setItem('locale', locale)
    setCookie('extLocale', locale, 7, 24, 0, config.cookieDomain)
    window.location.reload()
  }
  if (langShortName && languages[langShortName] && langShortName !== oldLocale) {
    store.dispatch(updateIntl({
      locale,
      messages: languages[locale],
    }))
    
    localStorage.setItem('locale', locale)
    setCookie('extLocale', locale, 7, 24, 1, config.cookieDomain)
  }
}

const UserPrivateRoute = ({
                          locale, component, hideHeader, hideFooter, darkerMenu, ...rest
                        }) => {
  const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null
  
  const render = (props) => {
    if (!currentUser) return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    
    return <StandardLayout {...props} hideHeader={hideHeader} hideFooter={hideFooter} content={component} darkerMenu={darkerMenu} onLanguageChange={onLanguageChange}/>
  }
  
  return (
    <Route
      {...rest}
      render={render}
    />
  )
}

UserPrivateRoute.propTypes = {
  component: PropTypes.func,
  hideHeader: PropTypes.bool,
  hideFooter: PropTypes.bool,
  darkerMenu: PropTypes.bool,
}

export default UserPrivateRoute


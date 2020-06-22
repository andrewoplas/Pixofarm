import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { updateIntl } from 'react-intl-redux'
import StandardLayout from '../layouts'
import languages from '../languages'
import { store } from '../store'
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

const PublicRoute = ({
  locale, component, hideHeader, hideFooter, darkerMenu, ...rest
}) => {
  return (
    <Route
      {...rest}
      render={
        props => (
          <StandardLayout
            {...props}
            content={component}
            onLanguageChange={onLanguageChange}
            hideHeader={hideHeader}
            hideFooter={hideFooter}
            darkerMenu={darkerMenu}
          />
        )
    }
    />
  )
}

PublicRoute.propTypes = {
  component: PropTypes.func
}
export default PublicRoute

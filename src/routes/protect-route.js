import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import StandardLayout from '../layouts/index'

const ProtectRoute = ({
   locale, component, hideHeader, hideFooter, darkerMenu, ...rest
}) => {
  const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null
 
  const render = (props) => {
    if (currentUser) return <Redirect to={{ pathname: '/', state: { from: props.location } }} />

    return <StandardLayout {...props} hideHeader={hideHeader} hideFooter={hideFooter} darkerMenu={darkerMenu} content={component} />
  }

  return (
    <Route
      {...rest}
      render={render}
    />
  )
}

ProtectRoute.propTypes = {
  component: PropTypes.func,
  hideHeader: PropTypes.bool,
  hideFooter: PropTypes.bool,
  darkerMenu: PropTypes.bool
}

export default ProtectRoute

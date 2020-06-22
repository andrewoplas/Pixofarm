import React from 'react'
import { Router, Switch } from 'react-router-dom'
import PublicRoute from './public-route'
import ProtectRoute from './protect-route'
import UserPrivateRoute from './user-private-route'
import ScrollToTop from '../components/scroll-to-top'
import languages from '../languages'
import { getLocalizedPath } from '../utils/funcs'

import Landing from '../pages/landing'
import NotFound from '../pages/not-found'
import Login from '../pages/login'
import Logout from '../pages/logout'
import ForgotPassword from '../pages/forgot-password'
import ResetPassword from '../pages/reset-password'
import PXAddUser from '../pages/add-user'
import PXSettingsUser from '../pages/settings-user'
import PXUsers from '../pages/users'
import PXUserProfile from '../pages/users/view-user/user'
import Imprint from '../pages/imprint'

import PxCorporates from '../pages/corporates/corporates'
import PXAddCorporate from '../pages/add-corporate'

import PXGroups from '../pages/groups'
import PXAddGroup from '../pages/add-group'

import PXAddFarm from '../pages/add-farm'
import PXSearchFarm from '../pages/search-farm'
import PXFarms from '../pages/farms/farms'

import PXAddOrchard from '../pages/add-orchard'
import PXOrchards from '../pages/orchards'
import PXOrchad from '../pages/orchad-details/orchad'

import PXWelcome from '../pages/welcome/welcome'

import PXCorporateDetailsold from '../pages/corporate-details'
import PXCorporateDetailsNew from '../pages/corporate-details/indexnew'

const createRoutes = (store) => {
  let routes = []

  Object.keys(languages).forEach((locale) => {
    const props = {
      store,
      locale,
    }

    routes = routes.concat([
      <PublicRoute key={`${locale}-home-route`} {...props} exact path={`/${locale}`} component={Landing} />,

      <PublicRoute key={`${locale}-login-route`} {...props} path={getLocalizedPath('/login', locale)} component={Login} hideHeader />,
      <PublicRoute key={`${locale}-forgot-password-route`} {...props} path={getLocalizedPath('/forgot_password', locale)} component={ForgotPassword} />,
      <PublicRoute key={`${locale}-reset-password-route`} {...props} path={getLocalizedPath('/reset_password', locale)} component={ResetPassword} />,
      <UserPrivateRoute key={`${locale}-add-user-route`} {...props} path={getLocalizedPath('/add_user', locale)} component={PXAddUser} />,
      <UserPrivateRoute key={`${locale}-settings-user-route`} {...props} path={getLocalizedPath('/settings_user', locale)} component={PXSettingsUser} />,
      <UserPrivateRoute key={`${locale}-users-route`} {...props} path={getLocalizedPath('/users', locale)} component={PXUsers} />,
      <UserPrivateRoute key={`${locale}-user-profile-route`} {...props} path={getLocalizedPath('/user_profile', locale)} component={PXUserProfile} />,

      <UserPrivateRoute key={`${locale}-corporate-details-route`} {...props} path={getLocalizedPath('/corporate-detailsold', locale)} component={PXCorporateDetailsold} />,
      <UserPrivateRoute key={`${locale}-corporate-detailsnew-route`} {...props} path={getLocalizedPath('/corporate-details', locale)} component={PXCorporateDetailsNew} />,
      <UserPrivateRoute key={`${locale}-corporates-route`} {...props} path={getLocalizedPath('/corporates', locale)} component={PxCorporates} />,
      <UserPrivateRoute key={`${locale}-add-corporate-route`} {...props} path={getLocalizedPath('/add-corporate', locale)} component={PXAddCorporate} />,

      <UserPrivateRoute key={`${locale}-groups-route`} {...props} path={getLocalizedPath('/groups', locale)} component={PXGroups} />,
      <UserPrivateRoute key={`${locale}-add-group-route`} {...props} path={getLocalizedPath('/add-group', locale)} component={PXAddGroup} />,

      <UserPrivateRoute key={`${locale}-add-farm-route`} {...props} path={getLocalizedPath('/add-farm', locale)} component={PXAddFarm} />,
      <UserPrivateRoute key={`${locale}-search-farm-route`} {...props} path={getLocalizedPath('/search-farm', locale)} component={PXSearchFarm} hideFooter darkerMenu />,
      <UserPrivateRoute key={`${locale}-farms-route`} {...props} path={getLocalizedPath('/farms', locale)} component={PXFarms} />,

      <UserPrivateRoute key={`${locale}-add-orchard-route`} {...props} path={getLocalizedPath('/add-orchard', locale)} component={PXAddOrchard} />,
      <UserPrivateRoute key={`${locale}-corporates-route`} {...props} path={getLocalizedPath('/orchards', locale)} component={PXOrchards} />,
      <UserPrivateRoute key={`${locale}-corporates-route`} {...props} path={getLocalizedPath('/orchad-details', locale)} component={PXOrchad} />,

      <UserPrivateRoute key={`${locale}-welcome-route`} {...props} path={getLocalizedPath('/welcome', locale)} component={PXWelcome} />,

      <PublicRoute key={`${locale}-imprint-route`} {...props} path={getLocalizedPath('/imprint', locale)} component={Imprint} />,
      <PublicRoute key={`${locale}-logout-route`} {...props} path={getLocalizedPath('/logout', locale)} component={Logout} hideHeader hideFooter />,

    ])
  })

  return routes
}

const routes = (history, store) => (
  <Router history={history}>
    <ScrollToTop>
      <Switch>
        <PublicRoute exact path="/" component={Landing} />,
        {createRoutes(store)}
        <PublicRoute exact path="*" component={NotFound} hideHeader hideFooter />,
      </Switch>
    </ScrollToTop>
  </Router>
)

export default routes

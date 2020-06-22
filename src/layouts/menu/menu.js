import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'
import { getLocalizedPath } from '../../utils/funcs'
import { Link } from 'react-router-dom'
import PXSettingsUserAvatar from '../../components/settings-user/avatar'
import { PXDropNav } from '../../components/_common'
import { isAdmin, isAssociation } from '../../utils/funcs'

import './menu.css'

class PXMainMenu extends React.Component {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }
  
  render () {
    const {
      intl: { messages, locale },
      location,
      darkerMenu,
    } = this.props
  
    const languages = [{
      label: messages.language_de,
      value: 'de',
    }, 
    {
      label: messages.language_en,
      value: 'en',
    }]
  
    let currentLanguage = ''
    Object.values(languages).map((i, j) => {
      if (i.value === locale) {
        currentLanguage = i.label
      }
    })
    const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null
    const userIsAdmin = isAdmin(currentUser)
    const userIsAssociation = isAssociation(currentUser)
    
    return (
      <ul className='main-menu uk-flex uk-flex-middle'>
        <div className='uk-width-1-2 drop-container uk-flex'>
          {currentUser && (userIsAdmin || userIsAssociation) && <PXDropNav />}
          {/*<li className='menu-item'>*/}
            {/*<a className="menu-item" type="button">{messages.menu.users}</a>*/}
            {/*<div uk-dropdown="mode: hover; animation: uk-animation-slide-top-small">*/}
              {/*<ul className="uk-nav uk-dropdown-nav submenu ">*/}
                {/**/}
                {/*<li><a href={getLocalizedPath('/add_user', locale)}>{messages.menu.addUser}</a></li>*/}
                {/*<li><a href={getLocalizedPath('/user_profile', locale)}>{messages.menu.userProfile}</a></li>*/}
                {/*<li><a href={getLocalizedPath('/settings_user', locale)}>{messages.menu.userSettings}</a></li>*/}
              {/*</ul>*/}
            {/*</div>*/}
          {/*</li>*/}
          {/*<li className='menu-item'>*/}
            {/*<a className="menu-item" type="button">{messages.menu.orchads}</a>*/}
            {/*<div uk-dropdown="mode: hover; animation: uk-animation-slide-top-small">*/}
              {/*<ul className="uk-nav uk-dropdown-nav submenu">*/}
                {/*<li><a href={getLocalizedPath('/orchads', locale)}>{messages.menu.listOrchads}</a></li>*/}
                {/*<li><a href={getLocalizedPath('/add-orchard', locale)}>{messages.menu.addOrchads}</a></li>*/}
                {/*<li><a href={getLocalizedPath('/orchad-details', locale)}>{messages.menu.orchadDetails}</a></li>*/}
              {/*</ul>*/}
            {/*</div>*/}
          {/*</li>*/}
          {/*<li className='menu-item'><a href={getLocalizedPath('/search-farm', locale)} className="menu-item">{messages.menu.map}</a></li>*/}
          {/*{!currentUser && <li className="menu-item button"><a className="icon-item" href={getLocalizedPath('/login', locale)}>{messages.menu.login}</a></li>}*/}
        </div>
        <div className='uk-width-1-2 uk-flex uk-flex-right'>
          {currentUser && currentUser.token &&
            <>
              <li className='menu-item'><a href={getLocalizedPath('/orchards', locale)}>{messages.menu.listOrchads}</a></li>
              <li className='menu-item'><a href={getLocalizedPath('/users', locale)}>{messages.menu.listUsers}</a></li>
              <li className='menu-item'><a href={getLocalizedPath('/search-farm', locale)} className="menu-item">{messages.menu.map}</a></li>
            </>
          }
          {currentUser && currentUser.token &&
            <li className='menu-item'>
              <a className="menu-item icon-item" type="button"><span className='uk-icon' uk-icon='icon: plus'></span></a>
              <div uk-dropdown="mode: hover; animation: uk-animation-slide-top-small; pos: bottom-right;">
                <ul className="uk-nav uk-dropdown-nav submenu spread">
                  <li><a href={getLocalizedPath('/add-orchard', locale)}><span className='uk-icon' uk-icon='icon: plus'></span>{messages.menu.addOrchads}</a></li>
                  <li><a href={getLocalizedPath('/add-farm', locale)}><span className='uk-icon' uk-icon='icon: plus'></span>{messages.menu.addFarm}</a></li>
                  <li><a href={getLocalizedPath('/add-group', locale)}><span className='uk-icon' uk-icon='icon: plus'></span>{messages.menu.addGroup}</a></li>
                  <li><a href={getLocalizedPath('/add_user', locale)}>{messages.menu.inviteUser}</a></li>
                </ul>
            </div>
            </li>
          }
          {currentUser && currentUser.token && 
            <li className="menu-item">
              <a className="menu-item icon-item avatar" type="button">
                <PXSettingsUserAvatar/>
              </a>
              <div uk-dropdown="mode: hover; pos: bottom-right; animation: uk-animation-slide-top-small">
                <ul className="uk-nav uk-dropdown-nav submenu small">
                  <li><a href={getLocalizedPath('/settings_user', locale)}>{messages.menu.userSettings}</a></li>
                  <hr></hr>
                  <li className="menu-item"><a className="icon-item" href={getLocalizedPath('/logout', locale)}>{messages.menu.logout}</a></li>
                </ul>
              </div>
            </li>}
          </div>
      </ul>
    )
  }
}
PXMainMenu.propTypes = {
  onLanguageChange: PropTypes.func,
  darkerMenu: PropTypes.bool,
}
  
const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXMainMenu))
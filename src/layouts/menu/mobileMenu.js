import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'
import { getLocalizedPath } from '../../utils/funcs'
import { Link } from 'react-router-dom'

class PXMobileMenu extends React.Component {

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
    return (
      <ul className='main-menu'>
        <li className='menu-item'><Link to={getLocalizedPath('/', locale)}>{messages.menu.home}</Link></li>
        {!currentUser && <li className="menu-item button"><a className="icon-item" href={getLocalizedPath('/login', locale)}>{messages.menu.login}</a></li>}
        {currentUser && currentUser.token && <li className="menu-item"><a className="icon-item" href={getLocalizedPath('/my_account', locale)}>{messages.menu.my_account}</a></li>}
        {currentUser && currentUser.token && <li className="menu-item"><a className="icon-item" href={getLocalizedPath('/logout', locale)}>{messages.menu.logout}</a></li>}

      </ul>
    )
  }
}
PXMobileMenu.propTypes = {
  onLanguageChange: PropTypes.func,
  darkerMenu: PropTypes.bool,
}
  
const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXMobileMenu))
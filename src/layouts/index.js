import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import StandardHeader from './header'
import StandardFooter from './footer'

import './index.css'

class StandardLayout extends React.Component {
  render() {
    const {
      content: Component,
      hideHeader,
      hideFooter,
      darkerMenu,
      ...rest
    } = this.props
    
    
    return (
      <div>
        {!hideHeader && <StandardHeader {...rest} darkerMenu={darkerMenu} onLanguageChange={this.props.onLanguageChange} />}
  
        <section className="content">
          <section className="wrapper">
            <Component {...rest} />
          </section>
        </section>
       
        {!hideFooter && <StandardFooter onLanguageChange={this.props.onLanguageChange} />}
      </div>
    )
  }
}

StandardLayout.propTypes = {
  content: PropTypes.func,
  onLanguageChange: PropTypes.func,
  hideHeader: PropTypes.bool,
  hideFooter: PropTypes.bool,
  darkerMenu: PropTypes.bool,
}

const mapStateToProps = (state = {}) => ({})

export default injectIntl(connect(mapStateToProps)(StandardLayout))

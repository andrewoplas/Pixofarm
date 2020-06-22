import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'
import { getLocalizedPath } from '../../utils/funcs'

import "./welcome.css";

class PXWelcome extends React.Component {
  render() {
    const {
        intl: { messages, locale },
    } = this.props
    
    return (
      <section className='page full-height single-screen with-bkg'>
        <section className="uk-container full-height small-pages left-background uk-height-1-1 uk-flex uk-flex-column uk-flex-center">
          <div className='uk-width-3-5@m uk-width-1-1'>
            <h1 className='title'>{messages.general.welcome.title}</h1>
            <p className='short-description'>
              {messages.general.welcome.welcomeMessage}
            </p>
            <div className='button-holder uk-width-2-5@s uk-width-1-1'>
              <div className='btns'>
                <a href={getLocalizedPath(`/add-orchard`, this.props.intl.locale)}>{messages.general.welcome.addOrchad}</a>
              </div>
            </div>
            <div className='button-holder uk-width-4-5@s uk-width-1-1'>
              <a href={getLocalizedPath(`/add-farm`, this.props.intl.locale)} className='link'>{messages.general.welcome.addFarm}</a>
              <p className='instructions'>{messages.general.welcome.addFarmDesc}</p>
              <a href={getLocalizedPath(`/add-group`, this.props.intl.locale)} className='link'>{messages.general.welcome.addGroup}</a>
              <p className='instructions'>{messages.general.welcome.addGroupDesc}</p>
            </div>
          </div>
        </section>
      </section>
    )
  }
}
export default (PXWelcome)

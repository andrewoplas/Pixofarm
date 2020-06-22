import React from 'react'
import { withRouter, Link } from "react-router-dom";
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import {getLocalizedPath} from "../../utils/funcs";

class ResetPasswordSuccess extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      terms: false
    }
  }
  
  goToLogin = () => {
    this.props.history.push({
      pathname: getLocalizedPath(`/login`, this.props.intl.locale)
    })
  }
 
  render() {
    const {
      intl: {
        messages, locale
      },
    } = this.props
    
    const {
      terms
    } = this.state
        
    return (
        <section className="forms-container forgot-password uk-width-1-1 uk-flex uk-flex-column uk-flex-center uk-flex-middle">
        <section className="uk-flex uk-flex-column login-page">
            <SmallLogo/>
            <div className="section-header">{messages.reset_password.success.header}</div>
            <form className="search-form uk-flex uk-flex-column" action="" name="main-search">
              <div className="info-text uk-flex uk-flex-column">
                {messages.reset_password.success.message.split ('\n').map ((item, i) => <p key={i}>{item}</p>)}
              </div>
              <div onClick={() => this.goToLogin()} className="btns">{messages.reset_password.success.login_btn}</div>
            </form>
          <footer>
            <div className="account-links">
            </div>
          </footer>
        </section>
        {!terms && <OnBoardLogo />}
        {terms && <TermsAndConditions showButton={false}/>}
      </section>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ResetPasswordSuccess))
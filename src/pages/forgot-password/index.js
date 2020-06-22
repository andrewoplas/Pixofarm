import React from 'react'
import { withRouter, Link } from "react-router-dom";
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { forgotPassword } from "../../redux/user/actions"
import PXForgotPasswordForm from '../../components/login/forgotPasswordForm'
import {getLocalizedPath} from "../../utils/funcs";

class PXForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      email: '',
      terms: false,
      isLoading: false
    }
  }
  
  handleSubmit = async (formValues) => {
    this.setState({isLoading: true})
    const {
      intl: {
        messages
      }
    } = this.props
    
    const forgotPasswordResponse = await this.props.forgotPassword(formValues)
    this.setState({isLoading: false})
    if(forgotPasswordResponse && forgotPasswordResponse.status && (forgotPasswordResponse.status === 201 || forgotPasswordResponse.status === 200)){
      this.props.notificationSuccess(forgotPasswordResponse.msg)
    }
  }
  
  goToResetPasswordPage = () => {
    this.props.history.push({
      pathname: getLocalizedPath(`/reset_password`, this.props.intl.locale)
    })
  }
  
  
  gotoLoginPage = () => {
    this.props.history.push({
      pathname: getLocalizedPath(`/login`, this.props.intl.locale)
    })
  }
  
  showTermsAndConditions = () => {
    this.setState({terms: true})
  }
  
  hideTermsAndConditions = () => {
    this.setState({terms: false})
  }
  
  render() {
    const {
      intl: {
        messages, locale
      },
    } = this.props
    
    const {
      terms,
      isLoading
    } = this.state
    
    return (
      <section className='forms-container forgot-password with-bkg'>
        <section className="uk-container full-height login-page uk-height-1-1 uk-flex uk-flex-column uk-flex-center">
          <div className='uk-width-2-3@m uk-width-1-2@s uk-width-1-1'>
            <PXForgotPasswordForm
              onSubmit={this.handleSubmit}
            />
            <footer className='page-footer-links'>
                <div className="uk-flex uk-text-center help">
                    <p>Do you need more help? <a href="/">Contact support</a></p>
                </div>
              </footer>
          </div>
        </section>
      </section>
    )
  }
}
const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  forgotPassword: data => dispatch(forgotPassword(data)),
})

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXForgotPassword)))
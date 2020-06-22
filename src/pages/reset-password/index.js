import React from 'react'
import { withRouter, Link } from "react-router-dom";
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { resetPassword, resetPasswordCheck } from "../../redux/user/actions"
import { notificationError, notificationSuccess } from '../../redux/notification/actions'
import PXResetPasswordForm from '../../components/login/resetPasswordForm'
import {getLocalizedPath} from "../../utils/funcs";

const queryString = require('query-string');

class PXResetPassword extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      token: '',
      terms: false,
      isLoading: false
    }
  }
  
  async componentWillMount() {
    this.setState({isLoading: true})
    const search = this.props.location.search;
    const params = queryString.parse(search);
  
    if(params && params.token){
      const resetPasswordCheck = await this.resetPasswordCheck(params.token)
      this.setState({isLoading: false})
      if(resetPasswordCheck && resetPasswordCheck.status && (resetPasswordCheck.status === 201 || resetPasswordCheck.status === 200)){
        this.props.notificationSuccess(resetPasswordCheck.msg)
      } else {
        setTimeout(() => {
          this.props.history.push({
            pathname: getLocalizedPath(`/`, this.props.intl.locale)
          })
        }, 1000)
      }
      if(resetPasswordCheck) {
        this.setState({
          token: params.token
        })
      }
    }
  
    this.setState({isLoading: false})
  }
  
  async resetPasswordCheck(token){
    return await this.props.resetPasswordCheck({token: token})
  }
    
  handleSubmit = async (formValues) => {
    this.setState({isLoading: true})
    
    const {
      intl: {
        messages
      }
    } = this.props
    
    const resetPasswordResponse = await this.props.resetPassword({
      token: this.state.token,
      password: formValues.new_password
    })
    this.setState({isLoading: false})
    if(resetPasswordResponse && resetPasswordResponse.status && (resetPasswordResponse.status === 201 || resetPasswordResponse.status === 200)){
      this.goToResetPasswordSuccessPage()
    } else {
      const error = new Error(messages.signup.failed_callback)
      this.props.notifyError(error)
    }
  }
  
  goToResetPasswordSuccessPage = () => {
    this.props.history.push({
      pathname: getLocalizedPath(`/reset_password_success`, this.props.intl.locale)
    })
  }
  
  gotoLoginPage = () => {
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
      terms,
      isLoading
    } = this.state
    
    return (
        <section className='forms-container forgot-password with-bkg'>
        <section className='uk-container full-height login-page uk-height-1-1 uk-flex uk-flex-column uk-flex-center'>
          <div className='uk-width-2-3@m uk-width-1-1'>
            <PXResetPasswordForm
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
  notifyError: err => dispatch(notificationError(err)),
  notificationSuccess: msg => dispatch(notificationSuccess(msg)),
  resetPassword: data => dispatch(resetPassword(data)),
  resetPasswordCheck: data => dispatch(resetPasswordCheck(data))
})

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXResetPassword)))
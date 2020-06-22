import React from 'react'
import { withRouter, Link } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { injectIntl } from 'react-intl'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { loginUser, getUser } from "../../redux/user/actions"
import { notificationError, notificationSuccess } from '../../redux/notification/actions'
import PXLogInForm from '../../components/login/loginForm'
import config from '../../config'
import { filtersToQuery, getLocalizedPath, setCookie, getParamsAsObject, urlserialize } from "../../utils/funcs";
import './login.css'

const queryString = require('query-string');

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      terms: false,
      fromEmail: false,
      isLoading: false,
      errors: null
    }
  }

  handleSubmit = async (formValues) => {
    this.setState({ isLoading: true })
    const {
      intl: {
        messages
      },
      getUser,
      loginUser
    } = this.props

    const loginResponse = await loginUser(formValues)
    if (loginResponse && loginResponse.token) {
      /** check if px_token is in storage and delete it. This is not used anymore */
      if (localStorage.getItem('px_token')) {
        localStorage.removeItem('px_token');
      }
      
      const currentUser = await this.props.getUser()

      /** redirect to welcome page */
      this.redirectToWelcomePage();
    } else {
      /** There are errors */
      let keys = Object.keys(loginResponse);
      let messages = [];
      keys.map(key => messages.push(loginResponse[key].join('<br/>')))
      this.setState({ errors: messages.join('<br/>') })
    }

    this.setState({ isLoading: false })
  }

  redirectToWelcomePage = () => {
    this.props.history.push({
      pathname: getLocalizedPath(`/welcome`, this.props.intl.locale),
    })
  }

  goToMyAccount = (userId) => {
    this.props.history.push({
      pathname: getLocalizedPath(`/my_account`, this.props.intl.locale),
    })
  }

  redirectToForgotPasswordPage = () => {
    this.props.history.push({
      pathname: getLocalizedPath(`/forgot_password`, this.props.intl.locale)
    })
  }

  render() {
    const {
      intl: {
        messages, locale
      },
    } = this.props

    const {
      isLoading
    } = this.state
    
    return (
      <section className="forms-container">
        <section className="uk-container full-height single-screen no-header login-page uk-height-1-1 uk-flex uk-flex-column uk-flex-center">
          <div className='uk-width-2-3@m uk-width-1-1'>
            <PXLogInForm
              onSubmit={this.handleSubmit}
              errors={this.state.errors}
              isLoading={isLoading}
            />
            <footer className='page-footer-links'>
              {/*<div className="account-links">*/}
                {/*<p className="password"><span onClick={() => this.redirectToForgotPasswordPage()}>I forgot my password</span></p>*/}
              {/*</div>*/}
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
  loginUser: data => dispatch(loginUser(data)),
  getUser: data => dispatch(getUser(data)),
})

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(Login)))
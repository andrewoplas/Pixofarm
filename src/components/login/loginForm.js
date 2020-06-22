import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import SimpleReactValidator from 'simple-react-validator';

import Logo  from '../../components/logo'

class PXLogInForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }
  }

  componentWillMount() {
    const {
      intl: {
        locale,
        messages
      }
    } = this.props

    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      locale: locale,
      className: 'uk-text-danger uk-animation-slide-top-small',
      messages: {
        required: 'Required',
        email: "Email required",
        min: "minimum length required",
      },
    });
  }

  setUsername = (e) => {
    this.setState({ username: e.target.value })
  }

  setPassword = (e) => {
    this.setState({ password: e.target.value })
  }

  submitForm = () => {
    if (this.validator.allValid()) {
      this.props.onSubmit(this.state)
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    const {
      intl: {
        messages
      },
      errors,
      onSubmit,
      isLoading,
    } = this.props

    return (
      <div className="form-holder">
        <div className="tagline uk-text-left">Login to Pixofarm</div>
        <form className="uk-width-1-2@m uk-width-1-1 search-form uk-flex uk-flex-column" action="" name="main-search">
          <div className="elements-group uk-flex uk-flex-column">
            <div className="input-holder form-group">
              <div className="uk-flex uk-flex-column">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={this.state.username}
                  placeholder={messages.login.username}
                  onChange={this.setUsername}
                  onBlur={() => this.validator.showMessageFor('username')}
                />
                {this.validator.message('username', this.state.username, 'required')}
              </div>
            </div>
            <div className="input-holder form-group">
              <div className="uk-flex uk-flex-column">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={this.state.password}
                  placeholder={messages.login.password}
                  onChange={this.setPassword}
                  onBlur={() => this.validator.showMessageFor('password')}
                />
                {this.validator.message('password', this.state.password, 'required')}
              </div>
            </div>
            <div className='button-holder uk-width-1-2@s uk-width-1-1'>
              {errors !== null && <p>{errors}</p>}
              <div className='btns' onClick={() => this.submitForm()}>
                {messages.login.submit}
              </div>
              {isLoading && 
                <div className="spinner-holder">
                  <Logo />
                  <div className='spinner'></div>
                </div>
              }
            </div>
          </div>
        </form>

      </div>
    )
  }
}

PXLogInForm.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
}

export default injectIntl(PXLogInForm)
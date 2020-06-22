import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import SimpleReactValidator from 'simple-react-validator';

class PXResetPasswordForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      email: '',
      emailConf: ''
    }
  }
  
  componentWillMount(){
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
      // messages: {
      //   required: messages.signup.validation.req.required,
      //   email: messages.signup.validation.req.email,
      //   min: messages.signup.validation.req.min,
      // },
    });
  }
  
  setEmail = (e) => {
    this.setState({email: e.target.value})
  }
  setEmailConf = (e) => {
    this.setState({emailConf: e.target.value})
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
      intl:{
        messages
      },
    } = this.props
    
    return (
      <div className='form-holder'>
        <div className="section-header"></div>
        <div className="tagline uk-text-left">Recover Password</div>
        <form className="uk-width-1-2@m uk-width-1-1 uk-flex uk-flex-column" action="" name="">
          <div className="elements-group uk-flex uk-flex-column">
            <div className="input-holder form-group">
              <div className="uk-flex uk-flex-column">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={this.state.email}
                  placeholder={'Email'}
                  onChange={this.setEmail}
                  onBlur={() => this.validator.showMessageFor('email')}
                />
                {this.validator.message('email_req', this.state.email, 'required|email')}
              </div>
            </div>
            <div className="input-holder form-group">
              <div className="uk-flex uk-flex-column">
                <input
                  type="email"
                  name="emailConf"
                  className="form-control"
                  value={this.state.emailConf}
                  placeholder={'Confirm Email'}
                  onChange={this.setEmailConf}
                  onBlur={() => this.validator.showMessageFor('emailConf')}
                />
                {this.validator.message('email_req', this.state.emailConf, 'required|emailConf')}
              </div>
            </div>
            <div className='button-holder uk-width-1-2@s uk-width-1-1'>
              <div className="btns" onClick={() => this.submitForm()}>Submit</div>
            </div>
          </div>
        </form>
      
      </div>
    )
  }
}

PXResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func
}

export default injectIntl(PXResetPasswordForm)
import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import SimpleReactValidator from 'simple-react-validator';
import Select from 'react-select'
import { USER_TYPE, CORPORATIONS, HOLDINGS } from '../../utils/constants'
import config from '../../config'

import './user.css'

class PXAddUser extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: this.props.user.id || null,
      fullName: this.props.user.first_name || '',
      emailAddress: this.props.user.email || '',
      phoneNumber: this.props.user.mobilenumber || '',
      password: '',
      userType: {
        value: this.props.user && this.props.user.user_role && this.props.user.user_role.typeId ? this.props.user.user_role.typeId : 2,
        label: this.props.user && this.props.user.user_role && this.props.user.user_role.typeName ? this.props.user.user_role.typeName : 'Farmer'
      },
      corporation: { value: 'corp-1', label: 'Corporation1' },
      holding: { value: 'pink-lady-holding', label: 'Pink Lady Holding' },
    }
  }

  componentWillMount() {
    console.log(this.props)
    const {
      intl: {
        locale,
        messages
      }
    } = this.props

    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      className: 'uk-text-danger uk-animation-slide-top-small',
      locale: `${locale}`,
      messages: {
        fullName: messages.add_user.req.fullName,
        password: messages.add_user.req.password,
        required: messages.add_user.req.required,
        alpha: messages.add_user.req.alpha,
        email: messages.add_user.req.email,
        phone: messages.add_user.req.phone,
        min: messages.add_user.req.min,
      },
    });

    //set password to random generated string
    this.setState({
      password: Array(config.passwordLength).fill(config.passwordCharsString).map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('')
    })
  }

  submitForm = () => {
    if (this.validator.allValid()) {
      this.props.onSubmit(this.state)
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  onChangeInput = (e) => {
    this.setState({
      [`${e.target.name}`]: e.target.value
    })
  }

  onChangeSelect = (value, label) => {
    this.setState({
      [`${label}`]: value
    })
  }

  render() {
    const {
      intl: {
        messages
      },
      inModal,
      user,
      roles
    } = this.props

    const {
      userId,
      fullName,
      emailAddress,
      phoneNumber,
      password,
      userType,
      corporation,
      holding,
    } = this.state
    
    return (
      <div className='form-holder'>
        <div className='section-header'>{userId ? messages.add_user.update_title : messages.add_user.add_title}</div>
        <form className="add-form uk-flex uk-flex-column" action="" name="">
          <div className="elements-group uk-flex uk-flex-column">

            <div className="uk-grid-colapse">
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='userType'>{messages.add_user.user_type}</label>
                <div className="uk-flex uk-flex-column">
                  <Select
                    name='userType'
                    className="form-control"
                    classNamePrefix="select"
                    options={roles}
                    value={userType}
                    onChange={(e) => this.onChangeSelect(e, 'userType')}
                  />
                  {this.validator.message('userType', userType, 'required')}
                </div>
              </div>
            </div>

            <div className="uk-grid-colapse">
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='fullName'>{messages.add_user.fullName}</label>
                <div className="uk-flex uk-flex-column">
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    value={fullName}
                    placeholder={messages.add_user.fullName}
                    onChange={(e) => this.onChangeInput(e)}
                    onBlur={() => this.validator.showMessageFor('fullName')}
                  />
                  {this.validator.message('fullName', fullName, 'required')}
                </div>
              </div>
            </div>

            <div className="uk-grid-colapse">
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='emailAddress'>{messages.add_user.emailAddress}</label>
                <div className="uk-flex uk-flex-column">
                  <input
                    type="text"
                    name="emailAddress"
                    className="form-control"
                    value={emailAddress}
                    placeholder={messages.add_user.emailAddress}
                    onChange={(e) => this.onChangeInput(e)}
                    onBlur={() => this.validator.showMessageFor('emailAddress')}
                  />
                  {this.validator.message('emailAddress', emailAddress, 'required|email')}
                </div>
              </div>
            </div>

            <div className="uk-grid-colapse">
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='phoneNumber'>{messages.add_user.phoneNumber}</label>
                <div className="uk-flex uk-flex-column">
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="form-control"
                    value={phoneNumber}
                    placeholder={messages.add_user.phoneNumber}
                    onChange={(e) => this.onChangeInput(e)}
                    onBlur={() => this.validator.showMessageFor('phoneNumber')}
                    readOnly={!userId ? false : true}
                  />
                  {this.validator.message('phoneNumber', phoneNumber, 'required|phone')}
                </div>
              </div>
            </div>

            <div className="uk-grid-colapse" style={{ display: 'none' }}>
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='password'>{messages.add_user.password}</label>
                <div className="uk-flex uk-flex-column">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={password}
                    placeholder={messages.add_user.password}
                    onChange={(e) => this.onChangeInput(e)}
                    onBlur={() => this.validator.showMessageFor('password')}
                    readOnly
                  />
                  {this.validator.message('password', password, 'required')}
                </div>
              </div>
            </div>

            <div className='button-holder uk-width-1-1 uk-flex uk-flex-middle'>
              {!userId && <div className='btns uk-width-1-3@m uk-width-1-1' onClick={() => this.submitForm()}>{messages.add_user.send_invitation}</div>}
              {userId && <div className='btns uk-width-1-3@m uk-width-1-1' onClick={() => this.submitForm()}>{messages.add_user.update}</div>}
              <span className="uk-width-1-6@m uk-width-1-1 uk-text-center">Cancel</span>
            </div>
            {(!inModal && !userId)&& <footer className='page-footer-notes'>
              <p>
                <span>{messages.add_user.password_note}</span>
                <span><a href='/'>{messages.add_user.support_note.contact_support}</a>{messages.add_user.support_note.contact_text}</span>
              </p>
            </footer>}
  
            {inModal || userId && <p></p>}
          </div>
        </form>
      </div>
    )
  }
}

PXAddUser.propTypes = {
  onSubmit: PropTypes.func,
  inModal: PropTypes.bool,
  user: PropTypes.object,
  roles: PropTypes.array,
}

export default injectIntl(PXAddUser)
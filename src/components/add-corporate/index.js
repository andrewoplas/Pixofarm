import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'
import SimpleReactValidator from 'simple-react-validator';
import Select from 'react-select'
import {COUNTRIES, FRUIT_TYPES, USERS} from '../../utils/constants'
import config from '../../config'
import { PXSelectUser } from '../_common'
import { addUser, updateUser } from "../../redux/user/actions"

import './style.css'

class PXAddCorporate extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      corporateId: this.props.corporateId || null,
      name: 'Ovidiu Rugina Corp',
      address: '',
      country: [],
      user: [],
      invitedUser: {},
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
      className: 'uk-text-danger uk-animation-slide-top-small',
      locale: `${locale}`,
      messages: {
        required: messages.add_corporate.req.required,
        alpha: messages.add_corporate.req.alpha,
        email: messages.add_corporate.req.email,
        phone: messages.add_corporate.req.phone,
        min: messages.add_corporate.req.min,
      },
    });
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
  
  onSelectUser = (userData) => {
    if (userData) {
      this.setState({
        user: userData
      })
    }
  }
  
  handleAddUserSubmit = async (formValues) => {
    if(!formValues.corporateId){
      addUser(formValues)
    } else {
      updateUser(formValues)
    }
  }
  
  render() {
    const {
      intl: {
        messages
      },
    } = this.props
    
    const {
      name,
      address,
      country,
      user,
    } = this.state
    
    return (
      <div className='form-holder'>
        <div className='section-header'>Add a new corporate</div>
        <form className="add-form uk-flex uk-flex-column" action="" name="">
          <div className="elements-group uk-flex uk-flex-column">
            <div className="uk-grid-colapse">
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='name'>{messages.add_corporate.name}</label>
                <div className="uk-flex uk-flex-column">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    placeholder={messages.add_corporate.name}
                    onChange={(e) => this.onChangeInput(e)}
                    onBlur={() => this.validator.showMessageFor('name')}
                  />
                  {this.validator.message('name', name, 'required')}
                </div>
              </div>
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='country'>{messages.add_corporate.address}</label>
                <div className="uk-flex uk-flex-column">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={address}
                    placeholder={messages.add_corporate.address}
                    onChange={(e) => this.onChangeInput(e)}
                    onBlur={() => this.validator.showMessageFor('address')}
                  />
                  {this.validator.message('address', address, 'required')}
                </div>
              </div>
            </div>
  
            <div className="uk-grid-colapse">
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='fruitType'>{messages.add_corporate.country}</label>
                <div className="uk-flex uk-flex-column">
                  <Select
                    name='country'
                    className="form-control"
                    classNamePrefix="select"
                    options={COUNTRIES}
                    value={country}
                    isMulti
                    onChange={(e) => this.onChangeSelect(e, 'country')}
                  />
                  {this.validator.message('country', country, 'required')}
                </div>
              </div>
            </div>
              <PXSelectUser
                data={USERS}
                required='true'
                inviteNewUser={true}
                isMultiple={false}
                validator={this.validator}
                onSelectUser={this.onSelectUser}
              />
  
            <div className='button-holder uk-width-1-2@s uk-width-1-1'>
              <div className='btns' onClick={() => this.submitForm()}>{messages.add_corporate.submit}</div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

PXAddCorporate.propTypes = {
  onSubmit: PropTypes.func
}

export default injectIntl(PXAddCorporate)
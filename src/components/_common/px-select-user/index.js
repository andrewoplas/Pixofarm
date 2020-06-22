import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from "react-intl";
import Select from 'react-select'

import './select-user.css'

class PXSelectUser extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    required: PropTypes.bool,
    isMultiple: PropTypes.bool,
    inviteNewUser: PropTypes.bool,
    validator: PropTypes.object,
    onSelectUser: PropTypes.func,
    label: PropTypes.string,
    defaultUser: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data || [],
      selected: {},
      selectedUserId: '',
      selectedFullName: '',
      selectedEmailAddress: '',
      selectedPhoneNumber: '',
      selectedValue: '',
      selectedLabel: '',
      showInviteUserForm: false,
    }
  }

  componentWillMount() {
    const {
      intl: {
        locale,
        messages
      },
      inviteNewUser,
    } = this.props

    let data = [...this.state.data]
    if (inviteNewUser) {
      this.setState({
        data: [
          {
            value: 0,
            label: messages.add_user.inviteNewUser,
          },
          ...data,
        ],
      })
    }
  }
  componentDidMount() {
    const {
      newOrchardData,
    } = this.props
    
    const {
      selectedValue,
      selectedLabel,
    } = this.state
    
    let data = [...this.state.data]
    
    let selectencoded = {
      selectedLabel: selectedLabel,
      selectedValue: selectedValue,
    }
    if (newOrchardData && newOrchardData.user && parseInt(newOrchardData.user) > 0) {
      for (let useri in data) {
        let user = data[useri]
        if (user.value === newOrchardData.user) {
          selectencoded = {
            selectedLabel: user.label,
            selectedValue: user.value,
          }
          break
        }
      }
    }
    this.setState({
      ...selectencoded
    })
  }
  
  onChangeInput = async (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      selectedValue: e.target.value
    })

    await this.props.onSelectUser({
      userId: 0,
      fullName: this.state.selectedFullName,
      emailAddress: this.state.selectedEmailAddress,
      phoneNumber: this.state.selectedPhoneNumber
    })
  }

  onChangeSelect = async (e) => {
    const {
      intl: {
        messages
      },
      
    } = this.props

    if (e.value === 0) {
      this.setState({
        selectedValue: 0,
        selectedFullName: '',
        selectedLabel: messages.add_user.inviteNewUser,
        showInviteUserForm: true,
      })

      return null
    }

    this.setState({
      selectedValue: e.value,
      selectedFullName: e.label,
      selectedUserId: e.value,
      selectedLabel: e.label,
      showInviteUserForm: false
    })

    await this.props.onSelectUser({
      value: e.value,
      fullName: e.label,
      userId: e.value,
      label: e.label
    })
  }

  render() {
    const {
      intl: {
        messages
      },
      required,
      isMultiple,
      validator,
      label,
    } = this.props

    const {
      selected,
      selectedValue,
      selectedLabel,
      showInviteUserForm,
      selectedUserId,
      selectedFullName,
      selectedEmailAddress,
      selectedPhoneNumber,
    } = this.state
    const data = [...this.state.data]
    if (validator) {
      validator.purgeFields()
    }
    let selectEncoded = ''
    if (parseInt(selectedValue) > 0) {
      selectEncoded = {
        value: selectedValue,
        label: selectedLabel
      }
    }
    
    return (
      <div className="elements-group uk-flex uk-flex-column">
        <div className="uk-grid-colapse">
          <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
            <label htmlFor='users'>{label ? label : messages.add_orchard.administrator}</label>
            <div className="uk-flex uk-flex-column">
              <Select
                name='users'
                options={data}
                value={selectEncoded}
                className='form-control'
                classNamePrefix="select"
                isMulti={isMultiple ? true : false}
                closeMenuOnSelect={isMultiple ? false : true}
                onChange={(e) => this.onChangeSelect(e)}
              />

              {required && validator.message('users', selectEncoded, 'required')}
            </div>
          </div>
        </div>

        {showInviteUserForm &&
          <div className="uk-grid-colapse">
            <div className='new-user-fields uk-animation-slide-top-medium'>
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='selectedFullName'>{messages.add_user.fullName}</label>
                <div className="uk-flex uk-flex-column">
                  <input
                    type="text"
                    name="selectedFullName"
                    className="form-control"
                    value={selectedFullName}
                    placeholder={messages.add_user.fullName}
                    onChange={(e) => this.onChangeInput(e)}
                    onBlur={() => validator.showMessageFor('selectedFullName')}
                  />
                  {validator.message('selectedFullName', selectedFullName, 'required')}
                </div>
              </div>

              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='selectedEmailAddress'>{messages.add_user.emailAddress}</label>
                <div className="uk-flex uk-flex-column">
                  <input
                    type="text"
                    name="selectedEmailAddress"
                    className="form-control"
                    value={selectedEmailAddress}
                    placeholder={messages.add_user.emailAddress}
                    onChange={(e) => this.onChangeInput(e)}
                    onBlur={() => validator.showMessageFor('selectedEmailAddress')}
                  />
                  {validator.message('selectedEmailAddress', selectedEmailAddress, 'required|email')}
                </div>
              </div>

              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='selectedPhoneNumber'>{messages.add_user.phoneNumber}</label>
                <div className="uk-flex uk-flex-column">
                  <input
                    type="tel"
                    name="selectedPhoneNumber"
                    className="form-control"
                    value={selectedPhoneNumber}
                    placeholder={messages.add_user.phoneNumber}
                    onChange={(e) => this.onChangeInput(e)}
                    onBlur={() => validator.showMessageFor('selectedPhoneNumber')}
                  />
                  {validator.message('selectedPhoneNumber', selectedPhoneNumber, 'required|phone')}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default injectIntl(PXSelectUser)

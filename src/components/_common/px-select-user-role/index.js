import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl";
import Select from 'react-select'

import './select-user.css'

class PXSelectUserRole extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    isRequired: PropTypes.bool,
    isMultiple: PropTypes.bool,
    validator: PropTypes.object,
    onSelectUserRole: PropTypes.func,
    label: PropTypes.string,
  }
  
  constructor(props) {
    super(props)
    
    this.state = {
      data: this.props.data || [],
      selected: {},
      selectedValue: 0,
      selectedLabel: '',
      selectedRoleId: '',
    }
  }
  
  onChangeSelect = async (e) => {
    const {
      intl: {
        messages
      },
    } = this.props
    
    this.setState({
      selectedRoleId: e.value,
      selectedValue: e.value,
      selectedLabel: e.label,
    })
  
    await this.props.onSelectUserRole({
      value: e.value,
      label: e.label
    })
  }
  
  render() {
    const {
      intl:{
        messages
      },
      isRequired,
      isMultiple,
      validator,
      label,
    } = this.props
    
    const {
      data,
      selected,
      selectedRoleId,
      selectedValue,
      selectedLabel,
    } = this.state
    
    return (
      <div className="elements-group uk-flex uk-flex-column">
        <div className="uk-grid-colapse">
          <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
            <label htmlFor='users'>{label ? label : messages.add_orchard.administrator}</label>
            <div className="uk-flex uk-flex-column">
              <Select
                name='role'
                options={data}
                value={{
                  value: selectedValue,
                  label: selectedLabel
                }}
                className='form-control'
                classNamePrefix="select"
                isMulti={isMultiple ? true : false}
                onChange={(e) => this.onChangeSelect(e)}
              />
              
              {isRequired && validator.message('role', selectedRoleId, 'required')}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(PXSelectUserRole)

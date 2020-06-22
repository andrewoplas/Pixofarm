import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl";
import Select from 'react-select'

import './select-user.css'

class PXSelectGroup extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    isRequired: PropTypes.bool,
    isMultiple: PropTypes.bool,
    validator: PropTypes.object,
    onSelectGroup: PropTypes.func,
    label: PropTypes.string,
  }
  
  constructor(props) {
    super(props)
    
    this.state = {
      data: this.props.data || [],
      selected: {},
      selectedGroupId: '',
      selectedValue: 0,
      selectedLabel: '',
    }
  }
  
  onChangeSelect = async (e) => {
    const {
      intl: {
        messages
      },
    } = this.props
  
    this.setState({
      selectedValue: e.value,
      selectedGroupId: e.value,
      selectedLabel: e.label,
    })
  
    await this.props.onSelectGroup({
      value: e.value,
      groupId: e.value,
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
      selectedValue,
      selectedLabel,
      selectedGroupId,
    } = this.state
    
    return (
      <div className="elements-group uk-flex uk-flex-column">
        <div className="uk-grid-colapse">
          <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
            <label htmlFor='users'>{label ? label : messages.add_orchard.administrator}</label>
            <div className="uk-flex uk-flex-column">
              <Select
                name='group'
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
              
              {isRequired && validator.message('group', selectedGroupId, 'required')}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(PXSelectGroup)

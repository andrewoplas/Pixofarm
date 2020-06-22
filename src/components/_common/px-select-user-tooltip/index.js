import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl";
import MultiLevelSelect from 'react-multi-level-selector';

import './select-user.css'

class PXSelectUserTooltip extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
  }
  
  constructor(props) {
    super(props)
    
    this.state = {
      data: this.props.data || [],
      selected: {},
      selectedValue: 0,
      selectedLabel: '',
    }
  }
  
  onChangeMultilevel = (evt) => {
    this.props.onChange(evt)
  }
  
  render() {
    const {
      intl:{
        messages
      },
      data,
      label,
    } = this.props
    
    return (
      <div className="elements-group uk-flex uk-flex-column">
        <div className="uk-grid-colapse">
          <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
            <label htmlFor='users'>{label ? label : messages.add_orchard.administrator}</label>
            <div className="uk-flex uk-flex-column">
              <MultiLevelSelect
                options={data}
                onChange={this.onChangeMultilevel}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(PXSelectUserTooltip)

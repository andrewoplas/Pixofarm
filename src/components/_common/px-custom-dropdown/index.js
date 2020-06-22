import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl";

import './custom_dropdown.css'

class PXCustomDropDown extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    onSelect: PropTypes.func,
    label: PropTypes.string,
  }
  
  constructor(props) {
    super(props)
    
    this.state =  {
      showOptions: false,
      selected: {}
    }
  }
  
  onChange = (option, isGroup) => {
    this.setState({
      selected: option,
      showOptions: !this.state.showOptions,
    }, () => {
      this.props.onSelect(option, isGroup)
    })
  }
  
  render() {
    const {
      data,
      label,
    } = this.props
    
    const {
      selected,
      showOptions
    } = this.state
    
    return (
      <div className="elements-group uk-flex uk-flex-column">
        <div className="uk-grid-colapse">
          <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
            <label htmlFor='users'>{label}</label>
            <div className="uk-flex uk-flex-column">
              <div className={`selected-option uk-label`} onClick={() => this.setState({showOptions: !showOptions})}>{selected && selected.label ? selected.label : ''}</div>
              {showOptions && <div className={`options-container`}>
                {data && data.length && data.map((option) => {
                  return (
                    <ul
                      key={`group-container-${option.value}`}
                      className={`uk-list uk-list-collapse uk-list-divider`}
                    >
                      <li
                        key={`listsubheader-${option.value}`}
                        onClick={() => this.onChange(option, true)}
                      >
                        {option.label}
                      </li>
                      {option.children && option.children.length ? (
                        <ul className={`uk-list`}>
                          {option.children.map((children) =>
                            <li
                              key={`menuitem-${option.value}-${children.value}`}
                              value={`${children.value}`}
                              onClick={() => this.onChange(children, false)}
                            >
                              {children.label}
                            </li>
                          )}
                        </ul>
                      ) : ''}
                    </ul>
                  )
                })}
              </div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(PXCustomDropDown)
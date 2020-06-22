import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl} from "react-intl";
import MultiLevelSelect from 'react-multi-level-selector';

import './select-user.css'

class PXSelectGroupFarmOrchard extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    withoutOrchards: PropTypes.bool,
    onChange: PropTypes.func,
  }
  
  constructor(props) {
    super(props)
    
    this.state = {
      data: this.props.data || [],
      withoutOrchards: this.props.withoutOrchards || false,
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
  
  formatMultiLevelData = () => {
    const {
      data,
      withoutOrchards,
    } = this.state
  
    let options = []
    if(data && data.data && data.data.length){
      data.data.forEach(async (group) => {
        let groupVal = {
          value: group.id,
          label: group.name,
        }
  
        let groupOptions = []
        if (group.farms && group.farms.length) {
          await group.farms.forEach(async (farm) => {
            let farmVal = {
              value: farm.id,
              label: farm.farmName,
            }
            
            let farmOptions = []
            if (farm && farm.orchards && farm.orchards.length && !withoutOrchards) {
              await farm.orchards.forEach((orchard) => {
                let orchardOption = {
                  value: orchard.fID,
                  label: orchard.orchardName
                }
                farmOptions.push(orchardOption)
              })
              
              if(farmOptions) {
                farmVal.options = farmOptions
              }
            }
  
            groupOptions.push(farmVal)
          })
  
          if(groupOptions) {
            groupVal.options = groupOptions
          }
        }
        
        options.push(groupVal)
      })
    }
    
    return options
  }
  
  onChangeMultilevel = (evt) => {
    this.props.onChange(evt)
  }
  
  render() {
    const {
      intl:{
        messages
      },
      label,
    } = this.props
    
    return (
      <div className="elements-group uk-flex uk-flex-column">
        <div className="uk-grid-colapse">
          <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
            <label htmlFor='users'>{label ? label : messages.add_orchard.administrator}</label>
            <div className="uk-flex uk-flex-column">
              <MultiLevelSelect
                options={this.formatMultiLevelData()}
                onChange={this.onChangeMultilevel}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(PXSelectGroupFarmOrchard)

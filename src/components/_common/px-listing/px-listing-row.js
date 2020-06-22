import React from 'react'
import PropTypes from "prop-types";
import moment from 'moment'

import './style.css'

class PXListingRow extends React.Component {
  constructor(props) {
    super(props)
  }

  handleChevronClick(id) {
    if (this.state['parent_' + id] === "none") {
      this.setState({ ['parent_' + id]: 'table' });
      this.setState({ ['icon_' + id]: 'chevron-up' });
    } else {
      this.setState({ ['parent_' + id]: 'none' });
      this.setState({ ['icon_' + id]: 'chevron-down' });
    }
  }

  componentWillMount() {
    if (this.props.data.hasOwnProperty('children')) {
      this.setState({ ['parent_' + this.props.data.id]: 'table' });
      this.setState({ ['icon_' + this.props.data.id]: 'chevron-up' });
    }
  }

  renderSingleRow(data, neededListingData, mappingActions) {
    return (
      <tr className='uk-flex table-row uk-flex-row uk-flex-wrap uk-child-width-expand uk-flex-middle' key={`row-${data.id}${data.farmId ? '-' + data.farmId : ''}${data.groupId ? '-' + data.groupId : ''}`}>
        {neededListingData && neededListingData.map((col, index) => {
          let value = data[col.key]
          const [props] = this.props.mappingObj.filter((obj) => obj.key === col.key)
          if (props.dateTransform) {
            if (data[col.key]) {
              value = moment(data[col.key]).format('D MMM. YYYY')
            } else {
              value = '---'
            }
          }
          
          if (props.hasTooltip) {
            return (
              <td className={`cell ${col.key}`} key={`col-${data.id}-${index}`}>
                {value}
              </td>
            )
          }
          
          return (
            <td className={`cell ${col.key}`} key={`col-${data.id}-${index}`}>{value}</td>
          )
        })}
        
        {mappingActions && Object.values(mappingActions) &&
          <td className='cell actions uk-text-center'>
            {data.id ? (<>
              <span uk-icon="more"></span>
              <div uk-dropdown="mode: click; animation: uk-animation-slide-top-small; pos: bottom-right; boundary: .actions">
                <ul className="action-links uk-flex-inline uk-flex-column uk-flex-bottom">
                  {Object.values(mappingActions).map((action) => {
                    if(action.key !== 'activate' && action.key !== 'deactivate') {
                      return (<li key={`action-${action.key}`} onClick={() => typeof action.callback === 'function' && action.callback(data.id)}>{action.label}</li>)
                    } else {
                      if(action.key === 'activate' && !data.isActive) {
                        return (<li key={`action-${action.key}`} onClick={() => action.callback(data.id)}>{action.label}</li>)
                      }
                      if(action.key === 'deactivate' && data.isActive) {
                        return (<li key={`action-${action.key}`} onClick={() => action.callback(data.id)}>{action.label}</li>)
                      }
                    }
                  })}
  
                </ul>
              </div>
            </>) : ''}
          </td>
        }
      </tr>
    )
  }

  render() {
    const {
      data,
      mappingObj,
      mappingActions
    } = this.props

    let neededListingData = []
    if (mappingObj && data) {
      Object.values(mappingObj).forEach((i, j) => {
        neededListingData.push({
          key: i.key,
          value: data[Object.keys(data).filter((colVal) => colVal === i.key)[0]]
        })
      })
    }

    if (data.hasOwnProperty('children')) {
      return (
        <tr key={`data-row-${data.id}`} className='groupHolder uk-flex table-row no-hover uk-flex-row uk-flex-wrap uk-child-width-expand uk-flex-middle'>
          <td className='cell groupName' colSpan={mappingObj.length}>
            <div className='uk-flex uk-flex-row uk-flex-between group-row'>
              <div className='uk-width-1-6 uk-flex uk-flex-row'>
                <p>{data.name}</p>
                {''}
                {data.actions &&  Object.values(data.actions) && <div className='cell actions uk-text-center'>
                  <span uk-icon="more"></span>
                  <div uk-dropdown="mode: click; animation: uk-animation-slide-top-small; pos: bottom-right; boundary: .actions">
                    <ul className="action-links uk-flex-inline uk-flex-column uk-flex-bottom">
                      {Object.values(data.actions).map((action) => {
                        
                        return (<li key={`action-${action.key}`} onClick={() => action.callback(data.id)}>{action.label}</li>)
                      })}
        
                    </ul>
                  </div>
                </div>}
              </div>
              <div className='uk-width-5-6 uk-flex uk-flex-row uk-flex-right'>
                <span className='indicator' id={`chevron-${data.id}`} uk-icon={this.state[`icon_${data.id}`]} onClick={() => this.handleChevronClick(data.id)}></span> <br />
              </div>
            </div>
            <table style={{ 'width': '100%', 'display': this.state[`parent_${data.id}`] }} id={`parent_${data.id}`}>
              <tbody key={`data-tbody-${data.id}`}>
                {data.children.map(child =>
                  this.renderSingleRow(child, neededListingData, mappingActions)
                )}
              </tbody>
            </table>
          </td>
        </tr >
      )
    }

    return this.renderSingleRow(data, neededListingData, mappingActions)
  }
}

PXListingRow.propTypes = {
  data: PropTypes.object.isRequired,
  mappingObj: PropTypes.array.isRequired,
  mappingActions: PropTypes.array
};

export default PXListingRow
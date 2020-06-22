import React from 'react'
import {injectIntl} from 'react-intl'
import {bindActionCreators} from 'redux'
import moment from 'moment'
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux'

import {
  getAllGroupsFarmsOrchards as getAllGroupsFarmsOrchardsRedux,
} from '../../../redux/farm/actions'
import {getLocalizedPath} from "../../../utils/funcs";
import PerfectScrollbar from 'react-perfect-scrollbar'

import 'react-perfect-scrollbar/dist/css/styles.css'
import './dropnav.css'


class PXDropNav extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      groups: []
    }
  }
  
  componentWillMount() {
    this.loadGroups()
  }
  
  loadGroups = async () => {
    const {
      getAllGroupsFarmsOrchards
    } = this.props
    
    this.setState({loading: true})
    
    const groups = await getAllGroupsFarmsOrchards()
    if (groups.data) {
      this.setState({
        groups,
        loading: false
      })
    }
  }
  
  listAllGroups = () => {
    if(localStorage.getItem('selected')) {
      const selectedValues = JSON.parse(localStorage.getItem('selected'))
      selectedValues.groupId = 0
      localStorage.setItem('selected', JSON.stringify(selectedValues))
    } else {
      localStorage.setItem('selected', JSON.stringify({
        groupId: 0,
        farmId: 0
      }))
    }
    
    this.props.history.push({
      pathname: getLocalizedPath(`/groups`, this.props.intl.locale),
    })
  }
  
  listAllFarms = (groupId) => {
    if(localStorage.getItem('selected')) {
      const selectedValues = JSON.parse(localStorage.getItem('selected'))
      selectedValues.groupId = groupId
      selectedValues.farmId = 0
      localStorage.setItem('selected', JSON.stringify(selectedValues))
    } else {
      localStorage.setItem('selected', JSON.stringify({
        groupId,
        farmId: 0
      }))
    }
    this.props.history.push({
      pathname: getLocalizedPath(`/farms`, this.props.intl.locale),
      search: `?groupId=` + groupId,
    })
  }
  
  listAllOrchards = (farmId) => {
    const {
      groups
    } = this.state
    
    if(localStorage.getItem('selected')) {
      const selectedValues = JSON.parse(localStorage.getItem('selected'))
      selectedValues.farmId = farmId
      localStorage.setItem('selected', JSON.stringify(selectedValues))
    } else {
      let groupId = 0
      if (groups && groups.data) {
        groups.data.forEach((group) => {
          if(group && group.farms) {
            group.farms.forEach((farm) => {
              if (farm.id === farmId) {
                groupId = group.id
              }
            })
          }
        })
      }
      
      localStorage.setItem('selected', JSON.stringify({
        farmId,
        groupId
      }))
    }
    
    this.props.history.push({
      pathname: getLocalizedPath(`/orchards`, this.props.intl.locale),
      search: `?farmId=` + farmId,
      hash: '#' + moment().unix()
    })
  }
  
  renderNumberOfTotalOrchards(groupFarms) {
    let total = 0
    
    if (groupFarms && groupFarms.length) {
      groupFarms.forEach((farm) => total += farm.numberOfOrchards )
    }
    
    return (
      <span>{total}</span>
    )
  }
  
  getGroupName = (groupId) => {
    const {
      groups
    } = this.state
    
    if (groups && groups.data.length) {
      const [group] = groups.data.filter((group) => group.id === groupId)
      return group.name
    }
  }
  
  getSelectedFarmTitle = (farmId) => {
    const {
      groups
    } = this.state
    
    let farmName = ''
    let groupName = ''
    if (groups && groups.data.length) {
      groups.data.map((group) => {
        if (group.farms && group.farms.length) {
          const [farm] = group.farms.filter((farm) => farm.id == farmId)
          if(farm) {
            farmName = farm.farmName
            groupName = group.name
          }
        }
      })
    }
    
    return groupName + ' > ' + farmName
  }
  
  render() {
    const {
      loading,
      groups,
    } = this.state
    
    const {
      intl: {
        messages
      }
    } = this.props
    
    if (loading) return ''
  
    let groupId = 0
    let farmId = 0
    if(localStorage.getItem('selected')) {
      const selectedValues = JSON.parse(localStorage.getItem('selected'))
      groupId = selectedValues.groupId
      farmId = selectedValues.farmId
    }
    
    let defaultTitle = messages.dropnav.select_title
    
    if(farmId === 0){
      if(groupId !== 0) {
        defaultTitle = this.getGroupName(groupId) + ' > ' + messages.dropnav.all
      } else {
        defaultTitle = messages.dropnav.all
      }
    } else {
      defaultTitle = this.getSelectedFarmTitle(farmId)
    }
    
    return (
      <div className='nav-dropdown uk-flex'>
        <a className='dropdown-open' type='button'>{defaultTitle}<span uk-icon='icon: chevron-right'></span></a>
        <div className='dropnav-container uk-width-1-3' uk-dropdown='mode: click; pos: bottom-left; animation: uk-animation-slide-top-small; boundary: .drop-container; boundary-align: true'>
          <div className='uk-flex'>
            <div className='main-items uk-width-1-3'>
              <PerfectScrollbar>
                <ul className='main-items-list uk-flex uk-flex-column' uk-tab="connect: #secondary; animation: uk-animation-fade">
                  {groups && groups.data.length && Object.values(groups.data).map((group) => {
                    return (
                      <li key={`group-${group.id}`} className={`item uk-width-1-1 ${groupId && group.id === groupId ? 'active' : ''}`}>
                        <a className='uk-flex-middle uk-width-1-1 uk-flex-between' href='#'>
                          <span className='name'>{group.name}</span>
                          <span uk-icon='icon: chevron-right'></span>
                        </a>
                      </li>
                    )
                  })}
                  <li key={`group-all`} className={`item uk-width-1-1 ${groupId && 'all' === groupId ? 'active' : ''}`}>
                    <a className='uk-flex-middle uk-width-1-1 uk-flex-between uk-close' href='#' onClick = {() => this.listAllGroups()}>
                      <span className='name'>{messages.dropnav.all}</span>
                    </a>
                  </li>
                </ul>
              </PerfectScrollbar>
            </div>
            <div className='secondary-items uk-width-2-3'>
              <PerfectScrollbar>
                <ul id="secondary" className="uk-switcher uk-flex">
                  {groups && groups.data.length && Object.values(groups.data).map((group) => {
                    return (
                      <li key={`group-farm-${group.id}`} className='secondary-items-list uk-text-center dropnav-item uk-flex uk-flex-row uk-child-width-1-2 uk-flex-wrap'>
                        {group.farms && group.farms.length && group.farms.map((farm) => {
                          return (
                            <div key={`group-farm-child-${farm.id}`} className={`uk-flex uk-flex-middle item ${farmId && farm.id === farmId ? 'active' : ''}`} onClick={() => this.listAllOrchards(farm.id)}>
                              <span className='name'>{farm.farmName}</span>
                              <span className='number'>({farm.numberOfOrchards})</span>
                            </div>
                          )
                        })}
                        <div key={`group-farm-child-all`} className={`uk-flex uk-flex-middle item ${farmId && 'all' === farmId ? 'active' : ''} uk-close`} onClick={() => this.listAllFarms(group.id)}>
                          <span className='name'>{messages.dropnav.all}</span>
                          <span className='number'>
                            ({this.renderNumberOfTotalOrchards(group.farms)})
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllGroupsFarmsOrchards: getAllGroupsFarmsOrchardsRedux,
}, dispatch)

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXDropNav)))
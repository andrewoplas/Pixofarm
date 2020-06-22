import React from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { PXSelectGroupFarmOrchard, PXListing, PXSelectUserTooltip } from '../../components/_common'
import { getAllGroupsFarmsOrchards as getAllGroupsFarmsOrchardsRedux } from '../../redux/farm/actions'
import {getLocalizedPath, getParamsAsObject} from "../../utils/funcs";
import {
  activateOrchard as activateOrchardRedux,
  deactivateOrchard as deactivateOrchardRedux,
} from '../../redux/orchard/actions'
import {
  getAllUsers as getAllUsersRedux
} from '../../redux/user/actions'

class PXFarms extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      farms: [],
      users: [],
      groupsFarmsOrchards: {},
      groupId: 0,
      loading: false,
      loadingUsers: false,
      selectedOrchard: 0,
      selectedGroupsOrFarms: [],
      selectedUsers: [],
      loadingFilter: false,
    }
  }

  componentWillMount() {
    this.fetchFarms()
    this.loadUsers()
  }
  
  loadUsers = async () => {
    this.setState({
      loadingUsers: true
    })
    const users = await this.props.getAllUsers()
    
    const selectableUsers = await Object.values(users.data).map((user) => {
      return {
        value: user.id,
        name: user.first_name ? user.first_name : '-',
        label: user.first_name ? user.first_name : '-',
      }
    })
    
    this.setState({
      users: selectableUsers,
      loadingUsers: false,
    })
  }
  
  fetchFarms = async () => {
    const {
      intl: {
        messages
      },
      getAllGroupsFarmsOrchards
    } = this.props
    
    this.setState({ loading: true })
    const groupsFarmsOrchards = await getAllGroupsFarmsOrchards()
  
    const params = getParamsAsObject(window.location.search)
    let farms = []
    if (params.groupId) {
      this.setState({ groupId: params.groupId })
      const [selectedGroup] = groupsFarmsOrchards.data.filter((group) => group.id == params.groupId)
      if (selectedGroup.farms) {
        farms = selectedGroup.farms
      }
    } else {
      let selectedFarms = []
      groupsFarmsOrchards.data.filter((group) => group.farms && group.farms.length).map((group) => {
        group.farms.forEach((farm) => {
          selectedFarms.push(farm)
        })
      })
      
      if (selectedFarms) {
        farms = selectedFarms
      }
    }
  
    const newFarms = await Object.values(farms).map((farm) => {
      let newFarmObject = {
        id: farm.id,
        name: farm.farmName,
        actions: [
          {
            key: `edit`,
            label: messages.list_groups.actions.edit,
            callback: this.onEditFarm
          },
          {
            key: `view`,
            label: messages.list_groups.actions.view,
            callback: this.onViewFarm
          },
        ]
      }
    
      newFarmObject.children = []
      if (farm.orchards && farm.orchards.length) {
        Object.values(farm.orchards).map((orchard) => {
        
          let prettyName = <>
            <div
              style={{color: 'green'}}
            >
              <a onClick={() => this.goToOrchardPage(orchard)}>{orchard.orchardName}</a>
            </div>
          </>
        
          let prettyForecastProduction = ''
          if (orchard.lastBatch && orchard.lastBatch.forecastProduction) {
            prettyForecastProduction = <>
              {orchard.lastBatch.forecastProduction}
              {this.renderForecastProduction(orchard.lastBatch)}
            </>
          }
        
          let childrenObj = {
            id: orchard.fID,
            farmId: farm.id,
            name: prettyName,
            orchardName: orchard.orchardName,
            location: orchard.location,
            size: orchard.calculatedSize,
            variety: orchard.fruit.variety,
            lastMeasurement: orchard.lastBatch && orchard.lastBatch.lastMeasurements ? orchard.lastBatch.lastMeasurements : '',
            forecastProduction: prettyForecastProduction,
            foreactsProductionRaw: orchard.lastBatch && orchard.lastBatch.forecastProduction ? orchard.lastBatch.forecastProduction : '-',
            isActive: orchard.isActive
          }
        
          newFarmObject.children.push(childrenObj)
        })
      } else {
        let prettyName = <>
          <div
            style={{color: 'green'}}
          >
            <a>-</a>
          </div>
        </>
  
        newFarmObject.children.push({
          id: 0,
          farmId: farm.id,
          name: prettyName,
          orchardName: '',
          location: '-',
          size: '-',
          variety: '-',
          lastMeasurement: '',
          forecastProduction: '-',
          foreactsProductionRaw: '',
        })
      }
    
      return newFarmObject
    })
    
    this.setState({
      farms: newFarms,
      loading: false,
      groupsFarmsOrchards,
    })
  }
  
  onEditFarm = (farm) => {
    this.props.history.push({
      pathname: getLocalizedPath(`/add-farm`, this.props.intl.locale),
      search: `?farmId=` + farm,
    })
  }
  
  onViewFarm = (farm) => {
    this.props.history.push({
      pathname: getLocalizedPath(`/corporate-details`, this.props.intl.locale),
      search: `?farmId=` + farm,
    })
  }
  
  onEditOrchard = (orchard) => {
    this.props.history.push({
      pathname: getLocalizedPath(`/add-orchard`, this.props.intl.locale),
      search: `?orchardId=` + orchard,
    })
  }
  
  onActivateOrchard = (orchard) => {
    this.props.activateOrchard(orchard)
  }
  
  onDeactivateOrchard = (orchard) => {
    this.props.deactivateOrchard(orchard)
  }
  
  goToOrchardPage = (orchard) => {
    this.props.history.push({
      pathname: getLocalizedPath(`/orchad-details`, this.props.intl.locale),
      search: `?id=` + orchard.fID,
    })
  }
  
  onAssignFarmRow = (row) => {
    this.setState({selectedOrchard: row})
  }
  
  onAssignUserRow = (row) => {
    this.setState({selectedOrchard: row})
  }
  
  onSelectGroupFarmOrchard = (value) => {
    this.setState({selectedGroupsOrFarms: value})
  }
  
  onSelectOrchardUser = (value) => {
    this.setState({selectedUsers: value})
  }
  
  reassignOrchardToGroupOrFarm = () => {
    const {
      selectedOrchard,
      selectedGroupsOrFarms,
    } = this.state
    
    console.info('reassignOrchard')
    console.info(selectedOrchard)
    console.info(selectedGroupsOrFarms)
    console.info('****')
  }
  
  reassignOrchardToUsers = () => {
    const {
      selectedOrchard,
      selectedUsers,
    } = this.state
    
    console.info('reassignOrchardToUsers')
    console.info(selectedOrchard)
    console.info(selectedUsers)
    console.info('****')
  }
  
  getGroupName = (groupId) => {
    const {
      groupsFarmsOrchards
    } = this.state
    
    if (groupsFarmsOrchards && groupsFarmsOrchards.data.length) {
      const [group] = groupsFarmsOrchards.data.filter((group) => group.id == groupId)
      return group.name
    }
  }
  
  renderForecastProduction = (lastBatch) => {
    return (
      <span uk-icon={`${lastBatch.changes < 0 ? 'triangle-down' : lastBatch.changes > 0 ? 'triangle-up' : ''}`}>{lastBatch.changes === 0 ? '-' : ''}</span>
    )
  }
  
  renderListingTable() {
    const {
      intl: {
        messages
      }
    } = this.props
    
    const {
      farms,
      groupsFarmsOrchards,
      users,
    } = this.state
    
    const orchardActions = [
      {
        key: `edit`,
        label: messages.list_orchards.actions.edit,
        callback: this.onEditOrchard
      },
      {
        key: `deactivate`,
        label: messages.list_orchards.actions.deactivate,
        callback: this.onDeactivateOrchard
      },
      {
        key: `activate`,
        label: messages.list_orchards.actions.activate,
        callback: this.onActivateOrchard
      },
      {
        key: `assign_farm`,
        label: <div className="">
          <span type="button">{messages.list_orchards.actions.assign_farm}</span>
          <div uk-drop="mode: click">
            <div className="uk-card uk-card-body uk-card-default">
              <div className="uk-grid-colapse">
                <div className="form-group uk-flex uk-flex-column">
                  <label htmlFor='autoAproveType'>{messages.users_list.reassign.select_container}</label>
                  <div className="uk-flex uk-flex-column">
                    <PXSelectGroupFarmOrchard
                      className="form-control"
                      data={groupsFarmsOrchards}
                      withoutOrchards={true}
                      onChange={this.onSelectGroupFarmOrchard}
                    />
                  </div>
                </div>
              </div>
              <div className='button-holder uk-width-1-1 uk-flex uk-flex-middle'>
                <div className='btns uk-width-1-3@m uk-width-1-1 uk-drop-close' onClick={() => this.reassignOrchardToGroupOrFarm()}>{messages.users_list.reassign.ok}</div>
                <button className="uk-button uk-button-default uk-drop-close" type="button" uk-close="true">{messages.users_list.reassign.cancel}</button>
              </div>
            </div>
          </div>
        </div>,
        callback: this.onAssignFarmRow
      },
      {
        key: `assign_user`,
        label: <div className="">
          <span type="button">{messages.list_orchards.actions.assign_user}</span>
          <div uk-drop="mode: click">
            <div className="uk-card uk-card-body uk-card-default">
              <div className="uk-grid-colapse">
                <div className="form-group uk-flex uk-flex-column">
                  <label htmlFor='autoAproveType'>{messages.users_list.reassign.select_container}</label>
                  <div className="uk-flex uk-flex-column">
                    <PXSelectUserTooltip
                      data={users}
                      onChange={this.onSelectOrchardUser}
                    />
                  </div>
                </div>
              </div>
              <div className='button-holder uk-width-1-1 uk-flex uk-flex-middle'>
                <div className='btns uk-width-1-3@m uk-width-1-1 uk-drop-close' onClick={() => this.reassignOrchardToUsers()}>{messages.users_list.reassign.ok}</div>
                <button className="uk-button uk-button-default uk-drop-close" type="button"  uk-close="true">{messages.users_list.reassign.cancel}</button>
              </div>
            </div>
          </div>
        </div>,
        callback: this.onAssignUserRow
      }
    ]
    
    const listHead = [
      {
        key: `name`,
        label: messages.list_groups.title.name,
        sortable: true,
        order: 'asc',
        aliasFor: 'orchardName',
      },
      {
        key: `location`,
        label: messages.list_groups.title.location,
        sortable: true,
        order: 'asc'
      },
      {
        key: `size`,
        label: messages.list_groups.title.size,
        sortable: true,
        order: 'asc',
        sortType: 'int'
      },
      {
        key: `variety`,
        label: messages.list_groups.title.variety,
        sortable: true,
        order: 'asc'
      },
      {
        key: `lastMeasurement`,
        label: messages.list_groups.title.measurement,
        sortable: true,
        order: 'asc',
        dateTransform: true,
        sortType: 'date',
      },
      {
        key: `forecastProduction`,
        label: messages.list_groups.title.forecast,
        sortable: true,
        order: 'asc',
        sortType: 'int',
        aliasFor: 'foreactsProductionRaw',
      },
    ]
    
    let filterObjectGroups = []
    if (farms && farms.length) {
      filterObjectGroups.push({
        key: 'all',
        label: messages.list_groups.sorting.all + '(' + farms.length + ')',
        active: true,
      })
      Object.values(farms).forEach((farm) => {
        filterObjectGroups.push({
          key: farm.id,
          label: farm.name,
          active: false,
        })
      })
    }
    
    const filterObjectsOrchards = [
      {
        key: 'all',
        label: messages.list_groups.sorting.all,
        active: true,
      },
      {
        key: 'active',
        label: messages.list_groups.sorting.active,
        active: false,
      },
      {
        key: 'inactive',
        label: messages.list_groups.sorting.inactive,
        active: false,
      },
    ]
    
    const filterObject = [
      {
        children: filterObjectGroups,
        callback: 'filterByGroup',
        key: 'group',
      },
      {
        children: filterObjectsOrchards,
        callback: 'filterOrchardsByStatus',
        key: 'status',
      }
    ]
    
    return (
      <PXListing
        data={farms}
        mappingObj={listHead}
        mappingActions={orchardActions}
        fullTextSearch={false}
        addFilterObject={filterObject}
      />
    )
  }

  render() {
    const {
      intl: {
        messages
      }
    } = this.props
    
    const {
      loading,
      loadingUsers,
      groupId,
      farms,
    } = this.state
  
    if (loading || loadingUsers) return ''
    
    return (
      <section className='page users full-height with-bkg'>
        <section className='uk-container'>
          <h1>{groupId ? messages.list_farms.header_group + ' ' + this.getGroupName(groupId) : messages.list_farms.header_all}</h1>
          {!loading && farms.length ? this.renderListingTable() : ''}
          {!loading && !farms.length ? <h4>{messages.list_farms.no_farms}</h4> : ''}
        </section>
      </section>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllGroupsFarmsOrchards: getAllGroupsFarmsOrchardsRedux,
  activateOrchard: activateOrchardRedux,
  deactivateOrchard: deactivateOrchardRedux,
  getAllUsers: getAllUsersRedux,
}, dispatch)

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXFarms)))
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";
import swal from 'sweetalert'
import {getLocalizedPath} from "../../utils/funcs";
import { notificationError, notificationInfo } from '../../redux/notification/actions'
import { PXSelectGroupFarmOrchard, PXListing, PXCustomDropDown } from '../../components/_common'
import {
  getAllGroupsFarmsOrchards as getAllGroupsFarmsOrchardsRedux,
} from '../../redux/farm/actions'
import {
  activateOrchard as activateOrchardRedux,
  deactivateOrchard as deactivateOrchardRedux,
  deleteOrchard as deleteOrchardRedux,
} from '../../redux/orchard/actions'
import {
  getAllUsers as getAllUsersRedux
} from '../../redux/user/actions'
import {
  deleteGroup as deleteGroupRedux,
} from '../../redux/group/actions'
import Logo from '../../components/logo'

import './groups.css'

class PXGroups extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      groups: [],
      users: [],
      groupsFarmsOrchards: {},
      loading: false,
      loadingUsers: false,
      selectedOrchard: 0,
      selectedGroupsOrFarms: [],
      selectedUsers: [],
      loadingFilter: false,
    }
  }
  
  componentWillMount() {
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
    
    console.info(selectableUsers)
    this.setState({
      users: selectableUsers,
      loadingUsers: false,
    }, () => {
      this.loadGroups()
    })
  }
  
  loadGroups = async () => {
    const {
      users
    } = this.state
    
    const {
      intl: {
        messages
      },
      getAllGroupsFarmsOrchards,
    } = this.props
    
    this.setState({loading: true})
    
    const groups = await getAllGroupsFarmsOrchards()
    
    if (groups.data) {
      this.setState({
        groupsFarmsOrchards: groups,
      })
      
      const newGroups = await Object.values(groups.data).map((group) => {
        let newGroupObject = {
          id: group.id,
          name: group.name,
          actions: [
            {
              key: `edit`,
              label: messages.list_groups.actions.edit,
              callback: this.onEditGroup
            },
            {
              key: `view`,
              label: messages.list_groups.actions.view,
              callback: this.onViewGroup
            },
            {
              key: `delete`,
              label: messages.list_groups.actions.delete,
              callback: this.onDeleteGroup
            },
            {
              key: `reassign`,
              label: <div className="">
                <span type="button">{messages.list_orchards.actions.assign_user}</span>
                <div uk-drop="mode: click">
                  <div className="uk-card uk-card-body uk-card-default">
                    <div className="uk-grid-colapse">
                      <div className="form-group uk-flex uk-flex-column">
                        <label htmlFor='autoAproveType'>{messages.users_list.reassign.select_container}</label>
                        <div className="uk-flex uk-flex-column">
                          <PXCustomDropDown
                            data={users}
                            onSelect={this.onSelectGroupUser}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='button-holder uk-width-1-1 uk-flex uk-flex-middle'>
                      <div className='btns uk-width-1-3@m uk-width-1-1' onClick={() => this.reassignGroupToUsers(group.id)}>{messages.users_list.reassign.ok}</div>
                      <button className="uk-button uk-button-default uk-drop-close" type="button"  uk-close="true">{messages.users_list.reassign.cancel}</button>
                    </div>
                  </div>
                </div>
              </div>,
              callback: this.onSelectGroupUser
            },
          ]
        }
        
        newGroupObject.children = []
        if (group.farms && group.farms.length) {
          Object.values(group.farms).map((farm) => {
            if (farm.orchards && farm.orchards.length) {
              Object.values(farm.orchards).map((orchard) => {
                
                let prettyName = <div className='group'>
                  <div className='name link'>
                    <a onClick={() => this.goToOrchardPage(orchard)}>{orchard.orchardName}</a>
                  </div>
                  <div className='farmName'>{farm.farmName}</div>
                </div>
                
                let prettyForecastProduction = ''
                const changes = 1
                if (orchard.lastBatch && orchard.lastBatch.forecastProduction) {
                  prettyForecastProduction = <>
                    {orchard.lastBatch.forecastProduction}
                    {this.renderForecastProduction(orchard.lastBatch)}
                  </>
                }
                
                let childrenObj = {
                  id: orchard.fID,
                  groupId: group.id,
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
                
                newGroupObject.children.push(childrenObj)
              })
            } else {
              let prettyName = <div className='group'>
                <div className='name link'>
                  <a>---</a>
                </div>
                <div className='farmName'>{farm.farmName}</div>
              </div>
              
              newGroupObject.children.push({
                id: 0,
                groupId: group.id,
                farmId: farm.id,
                name: prettyName,
                orchardName: '',
                location: '---',
                size: '---',
                variety: '---',
                lastMeasurement: '',
                forecastProduction: '---',
                foreactsProductionRaw: '',
              })
            }
          })
        } else {
          newGroupObject.children = [{
            id: 0,
            groupId: group.id,
            name: '---',
            orchardName: '',
            location: '---',
            size: '---',
            variety: '---',
            lastMeasurement: '',
            forecastProduction: '---',
            foreactsProductionRaw: '',
          }]
        }
        
        return newGroupObject
      })
      
      this.setState({
        groups: newGroups,
        loading: false
      })
    }
  }
  
  renderForecastProduction = (lastBatch) => {
    return (
      <span uk-icon={`icon: ${lastBatch.changes < 0 ? 'triangle-down' : lastBatch.changes > 0 ? 'triangle-up' : 'minus'}`}></span>
    )
  }
  
  onEditGroup = (group) => {
    this.props.history.push({
      pathname: getLocalizedPath(`/add-group`, this.props.intl.locale),
      search: `?groupId=` + group,
    })
  }
  
  onViewGroup = (group) => {
    this.props.history.push({
      pathname: getLocalizedPath(`/corporate-details`, this.props.intl.locale),
      search: `?groupId=` + group,
    })
  }
  
  onDeleteGroup = async (group) => {
    const {
      intl: { messages },
    } = this.props
  
    await swal({
      title: `${messages.list_groups.delete.title}`,
      text: `${messages.list_groups.delete.message}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        await this.props.deleteGroup(group)
        await this.loadGroups()
      }
    })
  }
  
  onEditOrchard = (orchard) => {
    this.props.history.push({
      pathname: getLocalizedPath(`/add-orchard`, this.props.intl.locale),
      search: `?orchardId=` + orchard,
    })
  }
  
  onActivateOrchard = async (orchard) => {
    const {
      intl: {
        messages
      },
      infoNotification,
      errorNotification,
    } = this.props
    
    const activateOrchard = await this.props.activateOrchard(orchard)
    if (activateOrchard.status === 201) {
      await infoNotification(messages.list_groups.activate_successfully)
      await this.loadUsers()
    }
  }
  
  onDeactivateOrchard = async (orchard) => {
    const {
      intl: {
        messages
      },
      infoNotification,
      errorNotification,
    } = this.props
  
    const deactivateOrchard = await this.props.deactivateOrchard(orchard)
    if (deactivateOrchard && deactivateOrchard.status === 201) {
      await infoNotification(messages.list_groups.deactivate_successfully)
      await this.loadUsers()
    }
  }
  
  onDeleteOrchard = async (orchard) => {
    const {
      intl: { messages },
    } = this.props
    
    await swal({
      title: `${messages.list_groups.delete.title}`,
      text: `${messages.list_groups.delete.message_orchard}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          await this.props.deleteOrchard(orchard)
          await this.loadGroups()
        }
      })
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
  
  onSelectGroupUser = (value) => {
    console.info(value)
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
  
  reassignGroupToUsers = (groupId) => {
    const {
      selectedUsers,
    } = this.state
  
    console.info('reassignOrchardToUsers')
    console.info(groupId)
    console.info(selectedUsers)
    console.info('****')
  }
  
  renderListingTable() {
    const {
      intl: {
        messages
      }
    } = this.props
    
    const {
      groups,
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
        key: `delete`,
        label: messages.list_groups.actions.delete,
        callback: this.onDeleteOrchard
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
                    <PXCustomDropDown
                      data={users}
                      onSelect={this.onSelectOrchardUser}
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
    if (groups && groups.length) {
      filterObjectGroups.push({
        key: 'all',
        label: messages.list_groups.sorting.all + '(' + groups.length + ')',
        active: true,
      })
      Object.values(groups).forEach((group) => {
        filterObjectGroups.push({
          key: group.id,
          label: group.name,
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
        data={groups}
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
    } = this.state
    
    return (
      <section className='page holdings full-height with-bkg'>
        <section className='uk-container'>
          <h1>{messages.list_groups.header}</h1>
          {loading || loadingUsers ? <div className="spinner-holder"><Logo /><div className='spinner'></div></div> : ''}
          {!loading && !loadingUsers && this.renderListingTable()}
        </section>
      </section>
    )
  }
}
const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllGroupsFarmsOrchards: getAllGroupsFarmsOrchardsRedux,
  activateOrchard: activateOrchardRedux,
  deactivateOrchard: deactivateOrchardRedux,
  getAllUsers: getAllUsersRedux,
  deleteGroup: deleteGroupRedux,
  deleteOrchard: deleteOrchardRedux,
  infoNotification: notificationInfo,
  errorNotification: notificationError,
}, dispatch)

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXGroups)))
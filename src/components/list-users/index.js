import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom';
import { PXListing, PXSelectGroupFarmOrchard, PXSelectUserRole } from '../../components/_common'
import { getLocalizedPath } from "../../utils/funcs"
import Select from 'react-select'
import PropTypes from 'prop-types'
import {
  groupsFarmsGet as groupsFarmsGetRedux,
} from '../../redux/farm/actions'
import {
  getAllUserRoles as getAllUserRolesRedux,
} from '../../redux/user/actions'

class UsersListComponent extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  }
  
  constructor(props) {
    super(props)
    
    this.state = {
      users: this.parseList(this.props.usersAll.data),
      roles: [],
      groupsFarmsOrchards: {},
      loading: false,
    }
  }
  
  componentDidMount(){
    this.loadGroupsFarmsOrchards()
    this.loadUserRoles()
  }
  
  loadGroupsFarmsOrchards = async () => {
    const groupsFarmsOrchards = await this.props.groupsFarmsGet()
    
    this.setState({groupsFarmsOrchards})
  }
  
  loadUserRoles = async () => {
    this.setState({loading: true})
    const userRoles = await this.props.getAllUserRoles()
    const selectableRoles = await Object.values(userRoles.data).map((userRole) => {
      return {
        value: userRole.typeID,
        label: userRole.type,
      }
    })
    
    this.setState({
      roles: selectableRoles,
      loading: false,
    })
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.usersAll && this.props.usersAll && prevProps.usersAll.loading && !this.props.usersAll.loading) {
      // console.log('UsersListComponent componentDidUpdate setstate', this.props, this.state)
      this.setState({
        users: this.parseList(this.props.usersAll.data)
      })
    }
  }
  
  goToViewProfile = (user) => {
    this.props.history.push({
      pathname: getLocalizedPath('/user_profile', this.props.intl.locale),
      search: `?uid=` + user.id,
    })
  }
  
  parseList = (users) => {
    return users.map((user) => {
      let typeName = ''
      if (user.user_role && user.user_role.typeName) {
        typeName = user.user_role.typeName
      }
      
      let first_name = ''
      if (user.first_name) {
        first_name = user.first_name
      }
      
      let prettyName = <>
        <div className='name link'
        >
          <a onClick={() => this.goToViewProfile(user)}>{first_name}</a>
        </div>
        <div className='role'>{typeName}</div>
      </>
      
      let prettyOrchards = <div className="users-orchads-list uk-flex uk-flex-left">
        <span className='uk-flex-center open-orchad-list' type="button">{user.orchards && user.orchards.length ? user.orchards.length : 0}</span>
        <div uk-dropdown='mode: click; animation: uk-animation-slide-top-small; pos: bottom-right; boundary: .users-orchads'>
          <ul className='action-links uk-flex uk-flex-column uk-flex-bottom'>
          {user.orchards && user.orchards.length && user.orchards.map((orchard, index) => {
            return (
              <li
                key={`btn-orchard-${orchard.fid}-${index}`}
                className=""
              >
                {orchard.orchardName}
              </li>
            )
          })}
          </ul>
        </div>
      </div>
      
      const orchardsNum = user.orchards ? user.orchards.length : 0
      
      return {
        ...user,
        orchards: prettyOrchards,
        prettyName: prettyName,
        orchardsNum: orchardsNum,
      }
    })
  }
  
  onEditRow = (row) => {
    this.props.history.push({
      pathname: getLocalizedPath(`/add_user`, this.props.intl.locale),
      search: `?id=` + row,
    })
  }
  
  onSuspendRow = (row) => {
    console.info(row)
  }
  
  onReassignRow = (row) => {
    console.info(row)
  }
  
  renderListingTable = (users) => {
    const {
      intl: {
        messages
      }
    } = this.props
    
    const {
      groupsFarmsOrchards,
      roles,
      loading,
    } = this.state
    
    if (loading) return ''
    
    const listHead = [
      {
        key: `prettyName`,
        label: messages.list_header.userName,
        sortable: true,
        sortType: 'string',
        order: 'asc',
        aliasFor: 'first_name',
      },
      {
        key: `email`,
        label: messages.list_header.userEmail,
        sortable: true,
        sortType: 'string',
        order: 'asc'
      },
      {
        key: `mobilenumber`,
        label: messages.list_header.userPhone,
        sortable: true,
        sortType: 'string',
        order: 'asc'
      },
      {
        key: `last_login`,
        label: messages.list_header.last_login_date,
        sortable: true,
        sortType: 'date',
        order: 'asc',
        dateTransform: true
      },
      {
        key: `orchards`,
        label: messages.list_header.orchards,
        sortable: true,
        sortType: 'int',
        order: 'asc',
        hasTooltip: true,
        aliasFor: 'orchardsNum',
      },
    ]
    
    const listActions = [
      {
        key: `edit`,
        label: `Edit`,
        callback: this.onEditRow
      },
      {
        key: `suspend`,
        label: `Suspend`,
        callback: this.onSuspendRow
      },
      {
        key: `reassign`,
        label: <div className="">
          <span type="button">{messages.users_list.reassign.reassign}</span>
          <div uk-drop="mode: click">
            <div className="uk-card uk-card-body uk-card-default reassign-form">
              <div className="uk-grid-colapse">
                <div className="form-group uk-flex uk-flex-column">
                  <label htmlFor='autoAproveType'>{messages.users_list.reassign.select_container}</label>
                  <div className="uk-flex uk-flex-column">
                    <PXSelectGroupFarmOrchard
                      className="form-control"
                      data={groupsFarmsOrchards}
                    />
                  </div>
                </div>
              </div>
              <div className="uk-grid-colapse">
                <div className="form-group uk-flex uk-flex-column">
                  <label htmlFor='autoAproveType'>{messages.users_list.reassign.select_role}</label>
                  <div className="uk-flex uk-flex-column">
                    {/*<PXSelectUserRole*/}
                      {/*data={roles}*/}
                      {/*isMultiple={false}*/}
                      {/*isRequired={true}*/}
                      {/*validator={this.validator}*/}
                      {/*label={messages.add_farm.user_role}*/}
                    {/*/>*/}
                  </div>
                </div>
              </div>
              <div className='button-holder uk-width-1-1 uk-flex uk-flex-middle'>
                <div className='btns uk-width-1-3@m uk-width-1-1' onClick={() => this.submitForm()}>{messages.users_list.reassign.ok}</div>
                <span className="uk-width-1-3@m uk-width-1-1 uk-text-center">{messages.users_list.reassign.cancel}</span>
              </div>
            </div>
          </div>
        </div>,
        callback: this.onReassignRow
      }
    ]
    
    const sortObject = [
      {
        key: 'prettyName',
        label: messages.listing.sorting.name
      },
      {
        key: 'email',
        label: messages.listing.sorting.email
      },
      {
        key: 'mobilenumber',
        label: messages.listing.sorting.phone
      },
      {
        key: 'last_login',
        label: messages.listing.sorting.last_login_date
      },
      {
        key: 'orchards',
        label: messages.listing.sorting.orchards
      },
    ]
    
    const Listing = () => <PXListing
      data={users}
      mappingObj={listHead}
      mappingActions={listActions}
      fullTextSearch={true}
      sortObject={sortObject}
    />
    
    return (
      <Listing/>
    )
  }
  
  render() {
    return (
      <section className='page users full-height with-bkg'>
        <section className='uk-container'>
          {!this.props.usersAll.loading
          && this.renderListingTable(this.state.users)
          }
        </section>
      </section>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  groupsFarmsGet: groupsFarmsGetRedux,
  getAllUserRoles: getAllUserRolesRedux,
}, dispatch)

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(UsersListComponent)))
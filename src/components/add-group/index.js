import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import SimpleReactValidator from 'simple-react-validator';
import { PXSelectUser, PXSelectUserRole, PXSelectGroup } from '../_common'
import {
  getAllUsers as getAllUsersRedux,
  getAllUserRoles as getAllUserRolesRedux,
} from '../../redux/user/actions'
import { getParamsAsObject, getLocalizedPath, urlserialize } from '../../utils/funcs'
import Logo from '../../components/logo'
import {
  getAllGroupsFarmsOrchards as getAllGroupsFarmsOrchardsRedux,
} from '../../redux/farm/actions'

import './style.css'

class PXAddGroup extends React.Component {
  static propTypes = {
    message: PropTypes.string,
  }
  
  constructor(props) {
    super(props)
    
    this.state = {
      groupId: 0,
      name: '',
      role: [],
      users: [],
      loadingUsers: false,
      loadingGroups: false,
      selectedUsers: [],
      selectedRole: {},
    }
  }
  
  componentWillMount() {
    const {
      intl: {
        locale,
        messages
      }
    } = this.props
  
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      className: 'uk-text-danger uk-animation-slide-top-small',
      locale: `${locale}`,
      messages: {
        required: messages.add_holding.req.required,
        alpha: messages.add_holding.req.alpha,
        email: messages.add_holding.req.email,
        phone: messages.add_holding.req.phone,
        min: messages.add_holding.req.min,
      },
    });
    
    this.loadUsers()
  }
  
  loadGroups = async () => {
    const {
      groupId,
      users,
    } = this.state
    
    this.setState({
      loadingGroups: true
    })
    const groups = await this.props.getAllGroupsFarmsOrchards()
    if (groups && groups.data) {
      groups.data.forEach((group) => {
        if(group.id == groupId) {
          this.setState({
            name: group.name
          })
          
          if (users && users.length) {
            const [groupOwner] = users.filter((user) => user.value === group.ownerID)
            /** to be forward if farid will want to show in assignation user the owner id **/
          }
        }
      })
    }
 
    this.setState({
      loadingGroups: false,
    })
  }
  
  loadUsers = async () => {
    const {
      groupId
    } = this.state
    
    this.setState({
      loadingUsers: true
    })
    const users = await this.props.getAllUsers()
    
    const selectableUsers = await Object.values(users.data).map((user) => {
      return {
        value: user.id,
        label: user.first_name,
      }
    })
    
    this.setState({
      users: selectableUsers,
      loadingUsers: false,
    }, () => {
      const params = getParamsAsObject(window.location.search)
      if (params && params.groupId) {
        if (params.groupId) {
          this.setState({
            groupId: params.groupId
          }, () => {
            this.loadGroups()
          })
        }
      }
    })
  }
  
  submitForm = () => {
    if (this.validator.allValid()) {
      this.props.onSubmit(this.state)
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  
  onChangeInput = (e) => {
    this.setState({
      [`${e.target.name}`]: e.target.value
    })
  }
  
  onChangeSelect = (value, label) => {
    this.setState({
      [`${label}`]: value
    })
  }
  
  onSelectUserRole = (roleData) => {
    this.setState({selectedRole: roleData})
  }
  
  onSelectUser = (userData) => {
    const {
      selectedUsers
    }  = this.state
    
    if (userData) {
      selectedUsers.push(userData)
    }
    
    this.setState({selectedUsers})
  }
  
  render() {
    const {
      intl: {
        messages
      },
      message,
    } = this.props
    
    const {
      name,
      users,
      loadingUsers,
      loadingGroups,
      groupId,
    } = this.state
  
    if (loadingUsers || loadingGroups) return <div className="spinner-holder"><Logo /><div className='spinner'></div></div>
    
    return (
      <div className='form-holder'>
        <div className='section-header'>{groupId ? messages.add_group.update_title : messages.add_group.title}</div>
        
        {message && <span className={`notifyMessage ${message.type}`}>{message.text}</span>}
        
        <form className="add-form uk-flex uk-flex-column" action="" name="">
          <div className="elements-group uk-flex uk-flex-column">
            <div className="uk-grid-colapse">
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='name'>{messages.add_holding.name}</label>
                <div className="uk-flex uk-flex-column">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    placeholder={messages.add_holding.name}
                    onChange={(e) => this.onChangeInput(e)}
                    onBlur={() => this.validator.showMessageFor('name')}
                  />
                  {this.validator.message('name', name, 'required')}
                </div>
              </div>
            </div>
  
            <PXSelectUser
              data={users}
              inviteNewUser={true}
              isMultiple={false}
              isRequired={true}
              validator={this.validator}
              onSelectUser={this.onSelectUser}
              label={messages.add_farm.user_assignation}
            />
  
            {/*<PXSelectUserRole*/}
              {/*data={roles}*/}
              {/*isMultiple={false}*/}
              {/*isRequired={true}*/}
              {/*validator={this.validator}*/}
              {/*onSelectUserRole={this.onSelectUserRole}*/}
              {/*label={messages.add_farm.user_role}*/}
            {/*/>*/}
  
            <div className='button-holder uk-width-1-2@s uk-width-1-1'>
              <div className='btns' onClick={() => this.submitForm()}>{groupId ? messages.add_group.update : messages.add_group.submit}</div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

PXAddGroup.propTypes = {
  onSubmit: PropTypes.func
}

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllGroupsFarmsOrchards: getAllGroupsFarmsOrchardsRedux,
  getAllUsers: getAllUsersRedux,
  getAllUserRoles: getAllUserRolesRedux,
}, dispatch)

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXAddGroup))
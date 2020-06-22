import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'
import { PXSelectUser, PXSelectUserRole, PXSelectGroup } from '../_common'
import {
  getAllUsers as getAllUsersRedux,
  getAllUserRoles as getAllUserRolesRedux,
} from '../../redux/user/actions'
import { groupsFarmsGet as groupsFarmsGetRedux } from '../../redux/farm/actions'


import './style.css'

class PXAddFarm extends React.Component {
  static propTypes = {
    message: PropTypes.string,
  }
  
  constructor(props) {
    super(props)
    
    this.state = {
      farmId: this.props.farmId || null,
      name: 'Ovidiu Rugina Farm',
      selectedUsers: [],
      selectedRole: {},
      selectedGroup: {},
      users: [],
      roles: [],
      loading: false,
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
        required: messages.add_farm.req.required,
        alpha: messages.add_farm.req.alpha,
        email: messages.add_farm.req.email,
        phone: messages.add_farm.req.phone,
        min: messages.add_farm.req.min,
      },
    });
    
    this.loadUsers()
    // this.loadUserRoles()
    this.props.groupsFarmsGet()
  }
  
  loadUsers = async () => {
    this.setState({
      loading: true
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
      loading: false,
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
  
  onSelectGroup = (selectedGroup) => {
    this.setState({selectedGroup})
  }
  
  render() {
    const {
      intl: {
        messages
      },
      groupsFarms,
      message,
    } = this.props
    
    const {
      name,
      users,
      loading,
      roles,
    } = this.state
    
    if (loading) return ''
    
    const groups = groupsFarms.data.map((group) => {
      return {
        value: group.id,
        label: group.name,
      }
    })
    return (
      <div className='form-holder'>
        <div className='section-header'>{messages.add_farm.title}</div>
        
        {message && <span>{message}</span>}
        
        <form className="add-form uk-flex uk-flex-column" action="" name="">
          <div className="elements-group uk-flex uk-flex-column">
            <div className="uk-grid-colapse">
              <div className="input-holder form-group uk-width-1-1 uk-child-width-1-2 uk-flex uk-flex-middle">
                <label htmlFor='name'>{messages.add_farm.name}</label>
                <div className="uk-flex uk-flex-column">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    placeholder={messages.add_farm.name}
                    onChange={(e) => this.onChangeInput(e)}
                    onBlur={() => this.validator.showMessageFor('name')}
                  />
                  {this.validator.message('name', name, 'required')}
                </div>
              </div>
  
              <PXSelectGroup
                data={groups}
                isMultiple={false}
                isRequired={true}
                validator={this.validator}
                onSelectGroup={this.onSelectGroup}
                label={messages.add_farm.group}
              />
              
              <PXSelectUser
                data={users}
                inviteNewUser={true}
                isMultiple={true}
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
            </div>
    
            <div className='button-holder uk-width-1-2@s uk-width-1-1'>
              <div className='btns' onClick={() => this.submitForm()}>{messages.add_farm.submit}</div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

PXAddFarm.propTypes = {
  onSubmit: PropTypes.func
}

const mapStateToProps = state => {
  return {
    groupsFarms: state.farm.groupsFarms,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllUsers: getAllUsersRedux,
  getAllUserRoles: getAllUserRolesRedux,
  groupsFarmsGet: groupsFarmsGetRedux
}, dispatch)

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXAddFarm))
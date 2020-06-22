import React from 'react'
import {withRouter} from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import PXAddUserForm from '../../components/add-user'
import {
  addUser,
  updateUser,
  getUserById,
  getAllUserRoles, getAllUserRoles as getAllUserRolesRedux,
} from "../../redux/user/actions"

const queryString = require('query-string');

class PXAddUser extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      user: {},
      isLoading: false,
      roles: [],
    }
  }
  componentWillMount(){
    this.loadUserProfile()
    this.loadUserRoles()
  }
  
  loadUserRoles = async () => {
    const userRoles = await this.props.getAllUserRoles()
    const selectableRoles = await Object.values(userRoles.data).map((userRole) => {
      return {
        value: userRole.typeID,
        label: userRole.type,
      }
    })
    
    this.setState({
      roles: selectableRoles,
    })
  }
  
  loadUserProfile = async () => {
    this.setState({isLoading: true})
    const search = this.props.location.search;
    const params = queryString.parse(search);
    
    if (params && params.id) {
      const user = await this.props.getUserById(params.id)
      if (user && user.data) {
        this.setState({
          user: user.data,
        })
      }
    }
    
    this.setState({isLoading: false})
  }
  
  handleSubmit = async (formValues) => {
    if(!formValues.userId){
      this.props.addUser(formValues)
    } else {
      this.props.updateUser(formValues)
    }
  }
  
  render() {
    const {
      intl: {
        messages, locale
      },
    } = this.props
    
    const {
      terms,
      isLoading,
      user,
      roles,
    } = this.state
    
    if(isLoading) return ''
    
    return (
      <section className="forms-container with-bkg">
        <section className='new-user full-height small-pages uk-container uk-height-1-1 uk-flex uk-flex-column uk-flex-center'>
          <div className='uk-width-2-3@m uk-width-1-1'>
          <PXAddUserForm
            onSubmit = {this.handleSubmit}
            user={user}
            roles={roles}
          />
        </div>
      </section>
      </section>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  addUser: data => dispatch(addUser(data)),
  updateUser: data => dispatch(updateUser(data)),
  getUserById: data => dispatch(getUserById(data)),
  getAllUserRoles: data => dispatch(getAllUserRoles(data)),
})

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXAddUser)))
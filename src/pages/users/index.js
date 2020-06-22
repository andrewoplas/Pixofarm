import React from 'react'
import { withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import UsersListComponent from '../../components/list-users'
import * as actionsUser from "../../redux/user/actions"

import './users.css'

class UsersList extends React.Component {

  componentDidMount() {
    this.props.usersAllGet()
  }

  render() {
    return (
      <UsersListComponent
        onSubmit={this.handleSubmit}
        usersAll={this.props.usersAll}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    usersAll: state.user.usersAll
  }
}

const mapDispatchToProps = dispatch => ({
  usersAllGet: data => dispatch(actionsUser.usersAllGet(data)),
})

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(UsersList)))
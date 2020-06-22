import React from 'react'
import { withRouter, Link } from "react-router-dom";
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { logoutUser } from "../../redux/user/actions"
import { notificationError, notificationSuccess } from '../../redux/notification/actions'
import { getLocalizedPath } from "../../utils/funcs";


class Logout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.goToIndexPage()
  }

  goToIndexPage = async () => {
    localStorage.setItem('currentUser', null)
    this.props.history.push({
      pathname: getLocalizedPath(`/`, this.props.intl.locale)
    })
  }

  render() {
    return (
      <div></div>
    )
  }
}
const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  notifyError: err => dispatch(notificationError(err)),
  notificationSuccess: msg => dispatch(notificationSuccess(msg)),
  logoutUser: logoutUser,
})

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(Logout)))
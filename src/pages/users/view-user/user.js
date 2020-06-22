import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'
import { getLocalizedPath } from '../../../utils/funcs'
import Moment from 'react-moment'
import { getUserById } from "../../../redux/user/actions"
import avatar from '../../../assets/images/avatar.png'
import './user.css'
import {notificationError, notificationSuccess} from "../../../redux/notification/actions";
import {withRouter} from "react-router-dom";

const queryString = require('query-string');

class PXUserProfile extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      user: {},
      isLoading: false,
    }
  }
  
  componentWillMount(){
    this.loadUserProfile()
  }
  
  goToEditProfile = () => {
    const {
      user
    } = this.state
  
    this.props.history.push({
      pathname: getLocalizedPath(`/add_user`, this.props.intl.locale),
      search: `?id=` + user.id,
    })
  }
  
  goToOrchardPage = (orchard) => {
    this.props.history.push({
      pathname: getLocalizedPath(`/orchad-details`, this.props.intl.locale),
      search: `?id=` + orchard.fID,
    })
  }
  
  loadUserProfile = async () => {
    this.setState({isLoading: true})
    const search = this.props.location.search;
    const params = queryString.parse(search);
    
    if (params && params.uid) {
      const user = await this.props.getUserById(params.uid)
      if (user && user.data) {
        this.setState({
          user: user.data,
          isLoading: false,
        })
      }
    }
  }
  
  render() {
    const {
        intl: { messages, locale },
    } = this.props
    
    const {
      user,
      isLoading,
    } = this.state
    
    if(isLoading) return ''
    
    const dateToFormat = user.date_joined;
    
    return (
      <section className='page user-profile full-height with-bkg'>
        <section className="uk-container full-height small-pages left-background uk-height-1-1 uk-flex uk-flex-column uk-flex-center">
          <div className='uk-width-3-5@m uk-width-1-1'>
            <div className='user summary uk-flex uk-flex-middle'>
              <div className='avatar'>
                <div className='circle'>
                  <img src={user.logo ? user.logo : avatar} />
                </div>
              </div>
              <div className='identity uk-flex uk-flex-column'>
                <span className='username section-title'>{user.first_name}</span>
                <span className='role'>{messages.profile.labels.role}: {user.user_role.typeName}</span>
              </div>
              <div className='actions'>
                  <span className='edit link action'><a onClick={() => this.goToEditProfile()}>{messages.listing.actions.edit}</a></span>
              </div>
            </div>
            <div className='user-details'>
                <div className='emailAddress user-detail uk-flex uk-child-width-1-2'>
                  <div className='label'>{messages.profile.labels.email}</div>
                  <div className='value'>{user.email ? user.email : '-'}</div>
                </div>
                <div className='emailAddress user-detail uk-flex uk-child-width-1-2'>
                  <div className='label'>{messages.profile.labels.phone}</div>
                  <div className='value'>{user.mobilenumber ? user.mobilenumber : '-'}</div>
                </div>
                {/*<div className='emailAddress user-detail uk-flex uk-child-width-1-2'>*/}
                  {/*<div className='label'>{messages.profile.labels.farm}</div>*/}
                  {/*<div className='value'>Pink Lady Farm</div>*/}
                {/*</div>*/}
                <div className='emailAddress user-detail uk-flex uk-child-width-1-2'>
                  <div className='label'>{messages.profile.labels.orchad}</div>
                  <div className='value multiple'>
                    {user.orchards && user.orchards.map((orchard) => {
                      return (
                        <div key={`orchard-${orchard.fID}`} className="value-row uk-flex uk-flex-column">
                          <span className='title link'><a onClick={() => this.goToOrchardPage(orchard)}>{orchard.orchardName}</a></span>
                          <span className='content'>{orchard.roundsOfMeasurements} {messages.profile.labels.measurements}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
            </div>
            <div className='footer'>
                <p className='profile-age'>
                    <span>{messages.profile.labels.member}</span>
                    <Moment>{dateToFormat}</Moment>
                </p>
            </div>
          </div>
        </section>
      </section>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  notifyError: err => dispatch(notificationError(err)),
  notificationSuccess: msg => dispatch(notificationSuccess(msg)),
  getUserById: data => dispatch(getUserById(data)),
})

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXUserProfile)))
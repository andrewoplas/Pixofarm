import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'
import NotificationSystem from 'react-notification-system'
import { notificationDismiss } from '../../redux/actions'

import './style.css'

class NotificationsContainer extends React.Component {
  componentDidMount() {
    if (this.props.notifications) {
      this.updateNotifications()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.notifications && this.props.notifications !== prevProps.notifications) {
      this.updateNotifications(prevProps.notifications)
    }
  }

  getNotificationMessage(notification) {

  }

  updateNotifications = (previousNotifications = null) => {
    const {
      notifications,
      dismissNotification,
      intl: {
        messages,
      },
    } = this.props
    const previousIds = previousNotifications && previousNotifications.map((notification) => notification.id)
    const newIds = notifications && notifications.map((notification) => notification.id)
    if (previousNotifications) {
      previousNotifications
        .filter((notification) => newIds.indexOf(notification.id) < 0)
        .map((notification) => this.notificationSystem.removeNotification(notification.id))
    }
    if (notifications) {
      notifications
        .filter((notification) => previousIds.indexOf(notification.id) < 0)
        .map((notification) => ({
          uid: notification.id,
          title: notification.translatedTitle || notification.title || messages[`notification_fallback_title_${notification.level}`],
          message: notification.translatedMessage || notification.message || messages[`notification_fallback_message_${notification.level}`],
          level: notification.level,
          position: 'tc',
          autoDismiss: 6,
          onRemove: () => dismissNotification(notification.id),
        }))
        .filter((notification) => notification.message)
        .map((notification) => this.notificationSystem.addNotification(notification))
    }
  }

  render() {
    const { notifications } = this.props

    if (!notifications) {
      return null
    }

    return (
      // Disable warning about wrong type, react-notification-system actually expects `false` here
      // per documentation
      // https://www.npmjs.com/package/react-notification-system#disabling-inline-styles
      // eslint-disable-next-line react/style-prop-object
      <NotificationSystem ref={(c) => { this.notificationSystem = c }} style={false} />
    )
  }
}

const mapStateToProps = (state) => ({
  notifications: state.notification.notifications,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  dismissNotification: notificationDismiss,
}, dispatch)

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer))

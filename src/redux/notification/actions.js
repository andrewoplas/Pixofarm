import { generateTempId } from '../../utils/funcs'

export const INFO = 'NOTIFICATIONS/INFO'
export const ERROR = 'NOTIFICATIONS/ERROR'
export const WARNING = 'NOTIFICATIONS/WARNING'
export const SUCCESS = 'NOTIFICATIONS/SUCCESS'
export const DISMISS = 'NOTIFICATIONS/DISMISS'
export const CLEAR = 'NOTIFICATIONS/CLEAR'

export const notificationError = (e) => ({
  type: ERROR,
  payload: {
    id: `noti-error-${generateTempId()}`,
    level: 'error',
    titleId: e.titleId,
    title: e.title,
    titleArgs: e.titleArgs,
    translatedTitle: e.translatedTitle,
    msgId: e.msgId,
    message: e.message,
    msgArgs: e.msgArgs,
    translatedMessage: e.translatedMessage,
  },
})

export const notificationSuccess = (message) => ({
  type: SUCCESS,
  payload: {
    id: `noti-success-${generateTempId()}`,
    level: 'success',
    message,
  },
})

export const notificationInfo = (message) => ({
  type: INFO,
  payload: {
    id: `noti-info-${generateTempId()}`,
    level: 'info',
    message,
  },
})

export const notificationWarning = (message) => ({
  type: WARNING,
  payload: {
    id: `noti-warning-${generateTempId()}`,
    level: 'warning',
    message,
  },
})

export const notificationDismiss = (id) => ({
  type: DISMISS,
  payload: id,
})

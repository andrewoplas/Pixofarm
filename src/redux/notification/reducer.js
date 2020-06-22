import {
  ERROR, SUCCESS, WARNING, INFO, DISMISS, CLEAR,
} from './actions'

const initialState = {
  notifications: [],
}

/**
 *
 * @param state
 * @param type
 * @param payload:
 *        type: 'ERROR', 'SUCCESS', 'INFO', 'WARNING' => {id, level, message}
 *        type: 'DISMISS' => id
 *        type: 'CLEAR' => nothing
 */
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ERROR:
    case SUCCESS:
    case WARNING:
    case INFO:
      return {
        ...state,
        notifications: [...state.notifications, payload],
      }
    case DISMISS:
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== payload),
      }
    case CLEAR:
      return {
        ...initialState,
      }
    default:
  }

  return { ...state }
}

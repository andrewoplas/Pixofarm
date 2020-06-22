import {
  USER_SET_CURRENT_USER,
} from './actions'
import { props } from 'bluebird'

export const initialState = {
  currentUser: {},
  settingsUser: {
    loading: false,
    error: null,
    data: {
      id: null,
      address: null,
      city: null,
      province: null,
      date_joined: null,
      email: '',
      first_name: '',
      last_login: null,
      mobilenumber: '',
      user_role: null,
      user_type: null,
      village: null,
    },
  },
  avatarUser: {
    loading: false,
    error: null,
    data: {
      avatar: null,
    }
  },
  usersAll: {
    loading: false,
    error: null,
    data: []
  }
}

export default (state = initialState, { type, payload }) => {
  // console.log('reducer', type, payload)
  switch (type) {
    case USER_SET_CURRENT_USER:
      {
        if (payload) {
          localStorage.setItem('currentUser', JSON.stringify(payload))
        } else {
          localStorage.removeItem('currentUser')
        }

        return {
          ...state,
          currentUser: { ...payload },
        }
      }
    case 'SETTINGSUSER_GET_LOADING':
      return {
        ...state,
        settingsUser: {
          ...state.settingsUser,
          loading: true
        }
      };
    case 'SETTINGSUSER_GET_SUCCESS':
      return {
        ...state,
        settingsUser: {
          ...state.settingsUser,
          loading: false,
          error: null,
          data: { ...state.settingsUser.data, ...payload },
        }
      };
    case 'SETTINGSUSER_GET_ERROR':
      return {
        ...state,
        settingsUser: {
          ...state.settingsUser,
          loading: false,
          error: payload.error,
        }
      };
    case 'SETTINGSUSER_UPDATE_LOADING':
      return {
        ...state,
        settingsUser: {
          ...state.settingsUser,
          loading: true
        }
      };
    case 'SETTINGSUSER_UPDATE_SUCCESS':
      return {
        ...state,
        settingsUser: {
          ...state.settingsUser,
          loading: false,
          error: null,
          data: { ...state.settingsUser.data, ...payload },
        }
      };
    case 'SETTINGSUSER_UPDATE_ERROR':
      return {
        ...state,
        settingsUser: {
          ...state.settingsUser,
          loading: false,
          error: payload.error,
        }
      };

    case 'USERSALL_GET_LOADING':
      return {
        ...state,
        usersAll: {
          ...state.usersAll,
          loading: true
        }
      };
    case 'USERSALL_GET_SUCCESS':
      return {
        ...state,
        usersAll: {
          ...state.usersAll,
          loading: false,
          error: null,
          data: Object.values(payload),
        }
      };
    case 'USERSALL_GET_ERROR':
      return {
        ...state,
        usersAll: {
          ...state.usersAll,
          loading: false,
          error: payload.error,
        }
      };

    case 'AVATARUSER_GET_LOADING':
      return {
        ...state,
        avatarUser: {
          ...state.avatarUser,
          loading: true
        }
      };
    case 'AVATARUSER_GET_SUCCESS':
      return {
        ...state,
        avatarUser: {
          ...state.avatarUser,
          loading: false,
          error: null,
          data: { ...state.avatarUser.data, ...payload },
        }
      };
    case 'AVATARUSER_GET_ERROR':
      return {
        ...state,
        avatarUser: {
          ...state.avatarUser,
          loading: false,
          error: payload.error,
        }
      };


    case 'AVATARUSER_UPDATE_LOADING':
      return {
        ...state,
        avatarUser: {
          ...state.avatarUser,
          loading: true
        }
      };
    case 'AVATARUSER_UPDATE_SUCCESS':
      return {
        ...state,
        avatarUser: {
          ...state.avatarUser,
          loading: false,
          error: null,
          data: { ...state.avatarUser.data, ...payload },
        }
      };
    case 'AVATARUSER_UPDATE_ERROR':
      return {
        ...state,
        avatarUser: {
          ...state.avatarUser,
          loading: false,
          error: payload.error,
        }
      };

    case 'SETTINGSUSER_CHANGEDO':
      console.log('SETTINGSUSER_CHANGEDO', state, {
        ...state,
        settingsUser: {
          ...state.settingsUser,
          data: { ...state.settingsUser.data, ...payload },
        }
      })
      return {
        ...state,
        settingsUser: {
          ...state.settingsUser,
          data: { ...state.settingsUser.data, ...payload },
        }
      };


    default:
      return state
  }
}

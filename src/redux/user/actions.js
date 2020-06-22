import config from '../../config'
import {
  apiGet,
  apiPut,
  apiPost,
  apiDelete,
} from '../../utils/api'
import { getResponseBody } from '../../utils/api'
import { notificationError } from "../notification/actions";

export const USER_SET_CURRENT_USER = 'USER_SET_CURRENT_USER'
export function loginUser(user) {
  return async (dispatch, getState) => {
    const response = await fetch(`${config.apiUrl}/token-auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password
      }),
    })

    const body = await response.json();

    if (body.token) {
      dispatch({
        type: 'USER_SET_CURRENT_USER',
        payload: body,
      })
    }

    return body
  }
}

export function getUser() {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))

      const response = await fetch(`${config.apiUrl}/user-profile/`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${token}`,
        },
      })

      const body = await getResponseBody(response)
      dispatch({
        type: 'USER_SET_CURRENT_USER',
        payload: {
          ...body,
          token: token
        },
      })

      return {
        ...body,
        status: response.status
      }
    } catch (error) {
      dispatch(notificationError(error))
    }
    return null;
  }
}

export function getUserById(uid) {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      
      const response = await fetch(`${config.apiUrl}/user-profile/?id=${uid}`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${token}`,
        },
      })
      
      const body = await getResponseBody(response)
      return {
        ...body,
        status: response.status
      }
    } catch (error) {
      dispatch(notificationError(error))
    }
    return null;
  }
}

export function getAllUsers() {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))

      const response = await fetch(`${config.apiUrl}/all-of-users/`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${token}`,
        },
      })

      return await getResponseBody(response)
    } catch (error) {
      dispatch(notificationError(error))
    }
    return null;
  }
}

export function logoutUser() {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: 'USER_SET_CURRENT_USER',
        payload: {},
      })
    } catch (error) {
      dispatch(notificationError(error))
    }
    return null;
  }
}

export function getAllUserRoles() {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      
      const response = await fetch(`${config.apiUrl}/user-types/`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${token}`,
        },
      })
      
      return await getResponseBody(response)
    } catch (error) {
      dispatch(notificationError(error))
    }
    return null;
  }
}

export function addUser(user) {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      
      const response = await fetch(`${config.apiUrl}/create-user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
        body: JSON.stringify({
          first_name: user.fullName,
          user_type: user.userType.value,
          mobilenumber: ""+user.phoneNumber,
          email: user.emailAddress,
        }),
      })
      
      const body = await getResponseBody(response)
      return {
        ...body,
        status: response.status
      }
    } catch (error) {
      dispatch(notificationError(error))
    }
    return null;
  }
}

export function updateUser(user) {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      
      const response = await fetch(`${config.apiUrl}/edit-user/?id=${user.userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
        body: JSON.stringify({
          id: user.userId,
          first_name: user.fullName,
          user_type: user.userType.value,
          mobilenumber: user.phoneNumber,
          email: user.emailAddress,
        }),
      })

      const body = await getResponseBody(response)
      return {
        ...body,
        status: response.status
      }
    } catch (error) {
      dispatch(notificationError(error))
    }
    return null;
  }
}

export function forgotPassword(user) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${config.apiUrl}/password/reset/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const body = await getResponseBody(response)
      return {
        ...body,
        status: response.status
      }
    } catch (error) {
      dispatch(notificationError(error))
    }
    return null;
  }
}

export function resetPassword(user) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${config.apiUrl}/password/reset/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const body = await getResponseBody(response)
      return {
        ...body,
        status: response.status
      }
    } catch (error) {
      dispatch(notificationError(error))
    }
    return null;
  }
}

export function resetPasswordCheck(user) {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${config.apiUrl}/password/reset/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const body = await getResponseBody(response)
      return {
        ...body,
        status: response.status
      }
    } catch (error) {
      dispatch(notificationError(error))
    }
    return null;
  }
}

export function usersAllGet() {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      dispatch({
        type: 'USERSALL_GET_LOADING',
      });
      const response = await fetch(`${config.apiUrl}/all-of-users/`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${token}`,
        },
      })
      const body = await getResponseBody(response)
      if (!body && !body.data) throw new Error('Whoops!')
      dispatch({
        type: 'USERSALL_GET_SUCCESS',
        payload: {
          ...body.data
        }
      });
    } catch (error) {
      dispatch({
        type: 'USERSALL_GET_ERROR',
        payload: {
          error
        }
      });
    }
  }
};
export const settingsUserGet = (req) => {
  const endpoint = 'https://webapi.pixofarm.com/api/user-profile/'
  // const endpoint = 'http://127.0.0.1:8000/php/user-profile.php'
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      dispatch({
        type: 'SETTINGSUSER_GET_LOADING',
      });
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${token}`,
        },
      })
      const body = await getResponseBody(response)
      if (!body && !body.data) throw new Error('Whoops!')
      dispatch({
        type: 'SETTINGSUSER_GET_SUCCESS',
        payload: {
          ...body.data
        }
      });
    } catch (error) {
      dispatch({
        type: 'SETTINGSUSER_GET_ERROR',
        payload: {
          error
        }
      });
    }
  }
};

export const settingsUserUpdate = (req) => {
  const endpoint = 'https://webapi.pixofarm.com/api/edit-user/'
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      dispatch({
        type: 'SETTINGSUSER_UPDATE_LOADING',
      });
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Authorization': `JWT ${token}`,
          'Content-Type': 'application/json',
        },
        // credentials: 'include',
        body: JSON.stringify(req),
      })
      const body = await getResponseBody(response)
      dispatch({
        type: 'SETTINGSUSER_UPDATE_SUCCESS',
        payload: {
          // ...body
        }
      });
    } catch (error) {
      dispatch({
        type: 'SETTINGSUSER_UPDATE_ERROR',
        payload: {
          error
        }
      });
    }
  }
};

export const avatarUserGet = (req) => {
  return async (dispatch, getState) => {
    // try {
    //   dispatch({
    //     type: 'AVATARUSER_GET_LOADING',
    //   });
    //   const response = await fetch(`http://127.0.0.1:8000/php/useravatarget.php`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     credentials: 'include',
    //     body: JSON.stringify(req),
    //   })
    //   const body = await getResponseBody(response)
    //   dispatch({
    //     type: 'AVATARUSER_GET_SUCCESS',
    //     payload: {
    //       ...body
    //     }
    //   });
    // } catch (error) {
    //   dispatch({
    //     type: 'AVATARUSER_GET_ERROR',
    //     payload: {
    //       error
    //     }
    //   });
    // }
  }
};

export const avatarUserUpdate = (req) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: 'AVATARUSER_UPDATE_LOADING',
      });
      const response = await fetch(`http://127.0.0.1:8000/php/useravatarset.php`, {
        method: 'POST',
        credentials: 'include',
        body: req,
      })
      const body = await getResponseBody(response)
      dispatch({
        type: 'AVATARUSER_UPDATE_SUCCESS',
        payload: {
          ...body
        }
      });
    } catch (error) {
      dispatch({
        type: 'AVATARUSER_UPDATE_ERROR',
        payload: {
          error
        }
      });
    }
  }
};
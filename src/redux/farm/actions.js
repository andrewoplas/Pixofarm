import config from '../../config'
import { apiPost, getResponseBody } from '../../utils/api'
import { notificationError } from "../notification/actions";

export function addFarm(farm) {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      
      const response = await fetch(`${config.apiUrl}/create-farm/`, {
        method: 'POST',
        headers: {
          'Authorization': `JWT ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: farm.name,
          group: farm.selectedGroup.value,
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
  }
}

export function updateFarm(farm) {
  return async (dispatch, getState) => {
    try {
      // const response = await fetch(`${config.apiUrl}/register`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     company_name: user.company_name,
      //     is_freelancer: user.is_freelancer,
      //     phone_number: user.phone_number,
      //     first_name: user.first_name,
      //     last_name: user.last_name,
      //     email: user.email,
      //     password: user.password,
      //     subscribed_for_newsletters: user.subscribed_for_newsletters,
      //     facebook_id: user.facebook_id,
      //     language: user.language
      //   }),
      // })
      //
      // const body = await getResponseBody(response)
      // return {
      //   ...body,
      //   status: response.status
      // }
    } catch (error) {
      dispatch(notificationError(error))
    }
    return null;
  }
}

export function getAllGroupsFarmsOrchards() {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      
      const response = await fetch(`${config.apiUrl}/groups-farms/`, {
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
  }
}

export function groupsFarmsGet() {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      
      dispatch({
        type: 'GROUPSFARMS_GET_LOADING',
      });
      
      const response = await fetch(`${config.apiUrl}/groups-farms/`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${token}`,
        },
      })
      const body = await getResponseBody(response)
      
      if (!body && !body.data) throw new Error('Whoops!')
      
      dispatch({
        type: 'GROUPSFARMS_GET_SUCCESS',
        payload: body.data
      });
      
      return body
    } catch (error) {
      dispatch({
        type: 'GROUPSFARMS_GET_ERROR',
        payload: {
          error
        }
      });
    }
  }
};
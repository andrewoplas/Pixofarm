import config from '../../config'
import { getResponseBody } from '../../utils/api'
import { notificationError } from "../notification/actions";

export function addGroup(group) {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      
      const response = await fetch(`${config.apiUrl}/create-group/`, {
        method: 'POST',
        headers: {
          'Authorization': `JWT ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: group.name,
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


export function updateGroup(group) {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      
      const response = await fetch(`${config.apiUrl}/create-group/`, {
        method: 'POST',
        headers: {
          'Authorization': `JWT ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: group.groupId,
          name: group.name,
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

export function deleteGroup(group) {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      
      console.info('delete group')
      console.info(group)
      console.info('*****')
      // const response = await fetch(`${config.apiUrl}/create-group/`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `JWT ${token}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     id: group.groupId,
      //     name: group.name,
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
  }
}
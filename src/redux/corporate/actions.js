import config from '../../config'
import { getResponseBody } from '../../utils/api'
import { notificationError } from "../notification/actions";

export function addCorporate(corporate) {
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

export function updateCorporate(corporate) {
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

export function getFruitsVarieties() {
  return async (dispatch) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))

      const response = await fetch(`${config.apiUrl}/fruits-varieties/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
      });
      const body = await getResponseBody(response);
      return {
        ...body,
        status: response.status
      };
    } catch (error) {
      dispatch(notificationError(error))
    }
    return null
  }
}
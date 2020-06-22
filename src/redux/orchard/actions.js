import config from '../../config'
import { getResponseBody } from '../../utils/api'
import { notificationError } from "../notification/actions";

export function addOrchard(orchard) {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))

      const response = await fetch(`${config.apiUrl}/create-orchard/`, {
        method: 'POST',
        headers: {
          'Authorization': `JWT ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orchard),
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

export function updateOrchard(orchard) {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      dispatch({
        type: 'FRUITVARIETIES_GET_LOADING',
      });
      const response = await fetch(`${config.apiUrl}/fruits-varieties/`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${token}`,
        },
      })
      const body = await getResponseBody(response)
      if (!body && !body.data) throw new Error('Whoops!')
      dispatch({
        type: 'FRUITVARIETIES_GET_SUCCESS',
        payload: body.data
      });
    } catch (error) {
      dispatch({
        type: 'FRUITVARIETIES_GET_ERROR',
        payload: {
          error
        }
      });
    }
  }
}

export function fruitVarietiesGet() {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      dispatch({
        type: 'FRUITVARIETIES_GET_LOADING',
      });
      const response = await fetch(`${config.apiUrl}/fruits-varieties/`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${token}`,
        },
      })
      const body = await getResponseBody(response)
      if (!body && !body.data) throw new Error('Whoops!')
      dispatch({
        type: 'FRUITVARIETIES_GET_SUCCESS',
        payload: body.data
      });
    } catch (error) {
      dispatch({
        type: 'FRUITVARIETIES_GET_ERROR',
        payload: {
          error
        }
      });
    }
  }
};
export function orchardDetailsGet(id) {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      dispatch({
        type: 'ORCHARDDETAILS_GET_LOADING',
      });
      const response = await fetch(`${config.apiUrl}/orchard-details/?fid=${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${token}`,
        },
      })
      const body = await getResponseBody(response)
      if (!body && !body.data) throw new Error('Whoops!')
      dispatch({
        type: 'ORCHARDDETAILS_GET_SUCCESS',
        payload: body.data
      });
    } catch (error) {
      dispatch({
        type: 'ORCHARDDETAILS_GET_ERROR',
        payload: {
          error
        }
      });
    }
  }
};

export function orchardListGet() {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      dispatch({
        type: 'ORCHARDLIST_GET_LOADING',
      });
      const response = await fetch(`${config.apiUrl}/list-orchards/`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${token}`,
        },
      })
      const body = await getResponseBody(response)
      if (!body && !body.data) throw new Error('Whoops!')
      dispatch({
        type: 'ORCHARDLIST_GET_SUCCESS',
        payload: body.data
      });
    } catch (error) {
      dispatch({
        type: 'ORCHARDLIST_GET_ERROR',
        payload: {
          error
        }
      });
    }
  }
};


export function activateOrchard(orchard) {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))

      const response = await fetch(`${config.apiUrl}/edit-orchard/?fid=${orchard}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `JWT ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: orchard,
          isActive: true,
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

export function deactivateOrchard(orchard) {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))

      const response = await fetch(`${config.apiUrl}/edit-orchard/?fid=${orchard}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `JWT ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: orchard,
          isActive: false,
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

export function deleteOrchard(orchard) {
  return async (dispatch, getState) => {
    try {
      const {
        token,
      } = JSON.parse(localStorage.getItem('currentUser'))
      
      console.info('delete orchard')
      console.info(orchard)
      
      // const response = await fetch(`${config.apiUrl}/deactivate-orchard/`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `JWT ${token}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     id: orchard
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
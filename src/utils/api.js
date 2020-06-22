import config from '../config'
import { getBrowserLocale } from './funcs'

export const getResponseBody = async (response) => {
  if (!response || response.status === 204) {
    return null
  }
  
  const contentType = response.headers.get('Content-Type')
  
  let data
  
  if (contentType && contentType.indexOf('application/json') >= 0) {
    data = await response.json()
  } else if (contentType && contentType.indexOf('text/csv') >= 0) {
    data = await response.blob()
  } else {
    data = await response.text()
  }
  
  if (response.status >= 200 && response.status < 300 && response.ok) {
    return data
  }
  
  let err
  
  if (data && data.translatedMessage) {
    err = new Error(data.translatedMessage)
    err.msgId = data.msgId
    err.msgArgs = data.msgArgs
    err.titleId = data.titleId
    err.titleArgs = data.titleArgs
    err.userLanguage = data.userLanguage
    err.translatedMessage = data.translatedMessage
    err.translatedTitle = data.translatedTitle
    err.status = response.status
  } else {
    err = new Error(data)
  }
  
  throw err
}

export async function apiCall(state, method, path, body) {
  const headers = {
    'Content-Type': 'application/json',
  }
  
  const response = await fetch(`${config.apiUrl}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  
  return getResponseBody(response)
}

export async function apiGet(state, path) {
  return apiCall(state, 'GET', path)
}

export async function apiPut(state, path, body) {
  return apiCall(state, 'PUT', path, body)
}

export async function apiPost(state, path, body) {
  return apiCall(state, 'POST', path, body)
}

export async function apiDelete(state, path, body) {
  return apiCall(state, 'DELETE', path, body)
}

import sendRequest from './utilities/sendRequest'

const BASE_URL = '/api/users'

export async function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData)
}

export async function logIn(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials)
}

export async function update(data) {
  return sendRequest(`${BASE_URL}`, 'PUT', data)
}

export async function deleteAccount(credentials) {
  return sendRequest(`${BASE_URL}/delete`, 'POST', credentials)
}

export async function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`)
}

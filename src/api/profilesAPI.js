import sendRequest from './utilities/sendRequest'

const BASE_URL = '/api/profiles'

export async function create(profileData) {
    return sendRequest(BASE_URL, 'POST', profileData)
}

export async function index() {
    return sendRequest(BASE_URL)
}

export async function me() {
    return sendRequest(`${BASE_URL}/me`)
}

export async function find(id) {
    return sendRequest(`${BASE_URL}/${id}`)
}

export async function update(id, data) {
    return sendRequest(`${BASE_URL}/${id}`, "PUT", data)
}

export async function deleteProfile(id, credentials) {
    return sendRequest(`${BASE_URL}/delete/${id}`, "POST", credentials)
}
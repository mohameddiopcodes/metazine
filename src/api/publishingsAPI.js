import sendRequest from './utilities/sendRequest'

const BASE_URL = '/api/publishings'

export async function create(publishingData) {
    return sendRequest(BASE_URL, 'POST', publishingData)
}

export async function index() {
    return sendRequest(BASE_URL)
}

export async function me(profileId) {
    return sendRequest(`${BASE_URL}/me/${profileId}`)
}

export async function find(id) {
    return sendRequest(`${BASE_URL}/${id}`)
}

export async function update(id, data) {
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', data)
}

export async function deletePublishing(id, credentials) {
    return sendRequest(`${BASE_URL}/delete/${id}`, 'POST', credentials)
}
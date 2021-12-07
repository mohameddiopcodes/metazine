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
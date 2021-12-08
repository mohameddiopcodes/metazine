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
import getToken from './utilities/getToken'
import * as usersAPI from './usersAPI'
import * as publishingsAPI from './publishingsAPI'
import * as profilesAPI from './profilesAPI'

//users
export async function signUp(userData) {
    const { token } = await usersAPI.signUp(userData)
    localStorage.setItem('token', token)
    return getUser()
}
export async function logIn(userData) {
    const { token } = await usersAPI.logIn(userData)
    localStorage.setItem('token', token)
    return getUser()
}

export async function checkToken() {
    const exp = await usersAPI.checkToken()
    return new Date(exp)
}

export function getUser() {
    const token = getToken();
    return token ? JSON.parse(window.atob(token.split('.')[1])).user : null;
}

export async function updateToken() {
    // let token = getToken();
    // const user = token ? JSON.parse(window.atob(token.split('.')[1])).user : null;
    // if(user) {
    //     localStorage.removeItem('token')
    //     token = await logIn({email: user.email, password: user.password})
    //     console.log(token)
    //     localStorage.setItem('token', token)
    // }
}

export function LogOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('profile')
}

//publishings
export async function createPublishing(publishingData) {
    return await publishingsAPI.create(publishingData)
}

export async function allPublishings() {
    return await publishingsAPI.index()
}

export async function myPublishings(profileId) {
    return await publishingsAPI.me(profileId)
}

export async function findPublishing(id) {
    return await publishingsAPI.find(id)
}

//profiles
export async function createProfile(profileData) {
    return await profilesAPI.create(profileData)
}

export async function allProfiles() {
    return await profilesAPI.index()
}

export async function myProfiles() {
    return await profilesAPI.me()
}

export async function findProfile(id) {
    return await profilesAPI.find(id)
}
import * as usersAPI from './usersAPI'

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
    const token = usersAPI.getToken();
    return token ? JSON.parse(window.atob(token.split('.')[1])).user : null;
}

export function LogOut() {
    localStorage.removeItem('token')
}
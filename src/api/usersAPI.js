const BASE_URL = 'api/users'

export async function signUp(userData) {
  return sendRequest(`${BASE_URL}`, 'POST', userData);
}

export async function logIn(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

/*--- Helper Functions ---*/

async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc. 
    const options = { method };
    if (payload) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(payload);
    }
    const token = getToken()
    if(token) {
        options.headers = options.headers || {}
        options.headers['Authorization'] = `Bearer ${token}`
    }
  
    const res = await fetch(url, options);
    // res.ok will be false if the status code set to 4xx in the controller action
    if (res.ok) return res.json();
    throw new Error((await res.json()).message)
}

export function getToken() {
    const token = localStorage.getItem('token')
    if(!token) return null
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    if(payload.exp < Date.now()/1000) {
        localStorage.removeItem('token')
        return null
    }
    return token
}

export async function checkToken() {
    return await sendRequest(`${BASE_URL}/check-token`)
}

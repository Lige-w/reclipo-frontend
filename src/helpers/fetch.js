const LOGIN_URL = 'http://localhost:3000/api/v1/login'
const AUTH_URL = 'http://localhost:3000/api/v1/profile'
const USERS_URL = 'http://localhost:3000/api/v1/users'

const token = () => localStorage.getItem('token')

const postFetch = (url, body) => (
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" :"application/json",
            "Accept" :"application/json"
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
)

const authFetch = () => {
    return fetch(AUTH_URL, {
        headers: {
            "Authentication": `Bearer ${token()}`
        }
    })
        .then(resp => resp.json())
}

export {
    LOGIN_URL,
    AUTH_URL,
    USERS_URL,
    postFetch,
    authFetch,
    token
}
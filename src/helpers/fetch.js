const LOGIN_URL = 'http://localhost:3000/api/v1/login'
const AUTH_URL = 'http://localhost:3000/api/v1/profile'
const USERS_URL = 'http://localhost:3000/api/v1/users'
const PROJECTS_URL = 'http://localhost:3000/api/v1/projects'

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

const authGetFetch = (url) => {
    return fetch(url, {
        headers: {
            "Authentication": `Bearer ${token()}`
        }
    })
        .then(resp => resp.json())
}

const authPostFetch = (url, body) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type" :"application/json",
            "Accept" :"application/json",
            "Authentication": `Bearer ${token()}`
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
}


export {
    LOGIN_URL,
    AUTH_URL,
    USERS_URL,
    PROJECTS_URL,
    postFetch,
    authGetFetch,
    authPostFetch,
    token
}
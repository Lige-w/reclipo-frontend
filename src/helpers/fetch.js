URL = 'http://localhost:3000/api/v1/'

const LOGIN_URL = URL + 'login/'
const AUTH_URL = URL + 'profile/'
const USERS_URL = URL + 'users/'
const PROJECTS_URL = URL + 'projects/'
const REFERENCES_URL = URL + 'references/'
const NOTES_URL = URL + 'notes/'


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


const authPatchFetch = (url, body) => {
    return fetch(url, {
        method: 'PATCH',
        headers: {
            "Content-Type" :"application/json",
            "Accept" :"application/json",
            "Authentication": `Bearer ${token()}`
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
}

const authDeleteFetch = (url) => {
    return fetch(url, {
        method: 'DELETE',
        headers: {
            "Authentication": `Bearer ${token()}`,
            "Content-Type" :"application/json",
            "Accept" :"application/json",
        }
    })
        .then(resp => resp.json())
}





export {
    LOGIN_URL,
    AUTH_URL,
    USERS_URL,
    PROJECTS_URL,
    REFERENCES_URL,
    NOTES_URL,
    postFetch,
    authGetFetch,
    authPostFetch,
    authPatchFetch,
    authDeleteFetch,
    token
}
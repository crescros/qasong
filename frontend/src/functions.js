import axios from "axios"

// IF PRODUCTION 
// axios.defaults.baseUrl = './'

// IF DEVELOPMENT

// axios.defaults.baseUrl = 'http://localhost:3016/'
const baseUrl = 'http://localhost:3016/'


export function getYoutubeIdFromSearch(search) {
    return axios.get(baseUrl + 'api/search?q=' + search).then(result => {
        return (result)
    })
}

export function authenticateUser(username, password) {
    const postBody = {
        "username": username,
        "password": password
    }

    return axios.post(baseUrl + 'api/users/authenticate', postBody).then(result => {
        return (result)
    })

}
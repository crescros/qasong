import axios from "axios"

// IF PRODUCTION 
// axios.defaults.baseUrl = './'
// const baseUrl = './'

// IF DEVELOPMENT

// axios.defaults.baseUrl = 'http://localhost:3016/'
const baseUrl = 'http://localhost:3016/'

export function getYoutubeIdFromSearch(search) {

    if (!search){
        return []
    }


    return axios.get(baseUrl + 'api/search?q=' + search).then(result => {
        return (result.data)
    })
}

export function authenticateUser(username, password) {
    const postBody = {
        "username": username,
        "password": password
    }

    return axios.post(baseUrl + 'api/users/authenticate', postBody).then(result => {
        return (result)
    }).catch(error => {
        return (error)
    })

}
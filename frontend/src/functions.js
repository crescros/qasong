import axios from "axios"

let baseUrl

if (process.env.NODE_ENV === 'production'){
    baseUrl = process.env.REACT_APP_API_URL_RELATIVE
} else if (process.env.NODE_ENV === 'development'){
    baseUrl = process.env.REACT_APP_API_URL_LOCAL
    
} else {
    baseUrl = process.env.REACT_APP_API_URL_LOCAL
}

export function setDefaultToken (token) {
    axios.defaults.headers.common['Authorization'] = "Bearer " + token
}

export function getYoutubeIdFromSearch(search) {
    if (!search){
        return []
    }

    return axios.get(baseUrl + 'api/search?q=' + search).then(result => {
        return result.data
    })
}

export function authenticateUser(username, password) {
    const postBody = {
        "username": username,
        "password": password
    }

    return axios.post(baseUrl + 'api/users/authenticate', postBody).then(result => {
        setDefaultToken(result.data.token)
        return result 
    }).catch(error => {
        return error
    })
}

export function createUser(username, password) {
    const postBody = {
        "username": username,
        "password": password
    }

    return axios.post(baseUrl + 'api/users/create', postBody).then(result => {
        return result
    }).catch(error => {
        return error
    })
}

export function getGlobalChat(){
    return axios.get(baseUrl + 'api/globalchat').then(result =>{
        return result
    }).catch(error =>{
        return error
    })
}

export function postGlobalChat(author, content){
    const postBody = {
        "author": author,
        "content": content
    }

    return axios.post(baseUrl + 'api/globalchat', postBody).then(result => {
        return result
    }).catch(error => {
        return error
    })
}

export function getNodeEnvironment(){
    return axios.get(baseUrl + 'api/env').then(result => {
        return result
    }).catch(error => {
        return error
    })
}

export function formatVideoTitle(name){
    if (name.length < 40 ){
        return name
    } else {
        return name.substr(0, 40) + "..."
    }
}
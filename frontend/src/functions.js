import axios from "axios"

// IF PRODUCTION 
// let urlBase = './'

// IF DEVELOPMENT
let urlBase = 'http://localhost:3016/'

export function getYoutubeIdFromSearch (search) {
    return axios.get(urlBase + 'api/search?q=' + search).then(result => {
        return(result)
    })
}
import axios from "axios"

let urlBase = 'http://localhost:3016/'

export function getYoutubeIdFromSearch (search) {
    return axios.get(urlBase + 'api/search?q=' + search).then(result => {
        return(result)
    })
}
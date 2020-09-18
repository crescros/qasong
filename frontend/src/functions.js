import axios from "axios"

export function getYoutubeIdFromSearch (search) {
    return axios.get('./api/search?q=' + search).then(result => {
        return(result)
    })
}
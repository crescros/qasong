import axios from "axios"

export function getYoutubeIdFromSearch (search) {
    return axios.get('http://localhost:3016/api/search?q=' + search).then(result => {
        return(result)
    })
}
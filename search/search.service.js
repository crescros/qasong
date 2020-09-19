const axios = require('axios')

module.exports = {
    search
};

async function search({ searchTerm, apiKey }) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${searchTerm}&key=${apiKey}`).then(response => {
        return response.data.items
    })
}

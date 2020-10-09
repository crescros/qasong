const yts = require("yt-search");
const { v4: uuidv4 } = require("uuid");


module.exports = {
  searchYoutube,
  searchYoutubeById,
};

const searchFixture = require("./searchFixture.json"); // Test data

async function searchYoutube({ searchTerm }) {
  if (process.env.USE_MOCK_SEARCH_DATA === "1") {
    return searchFixture.items;
  } else {
    return yts(searchTerm).then((results) => {
      return results;
    });
  }
}

async function searchYoutubeById({ ids }) {

  if(!Array.isArray(ids)){
    ids = [ids]
  }

  const videos = ids.map( id =>{
    return yts({videoId: id})
  })

  return Promise.all(videos).then(values => {

    const queueValues = values.map(value =>{
      return {
        "id": value.videoId,
        "title": value.title,
        "description": value.description,
        "smallThumbnailUrl": value.thumbnail,
        "thumbnailUrl": value.thumbnail,
        "qid": uuidv4()
      }
    })

    return queueValues
  })

}

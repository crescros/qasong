const searchYoutube = require("../../search/search.service").searchYoutube

describe("searchYoutube", () => {
  it("valid search results", async () => {
    const result = await searchYoutube({
      searchTerm: "DMX call me maybe",
      apiKey: Cypress.env("YOUTUBE_API_KEY"),
    })

    expect(result).to.exist
    expect(result.length).to.be.greaterThan(11)
    expect(result[0]).to.have.property("id")
    expect(result[0]).to.have.property("snippet")
  })
})

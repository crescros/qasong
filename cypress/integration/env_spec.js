describe('.env file', () => {
    it('is exists', () => {
      expect(typeof Cypress.env()).to.not.equal(undefined)
    })

    it('has secret with type: int', () =>{
      expect(typeof Cypress.env("SECRET")).to.equal("number")
    })
    
    it('has youtube api key', ()=> {
      expect(typeof Cypress.env("YOUTUBE_API_KEY")).to.equal("string")        
    })
  })
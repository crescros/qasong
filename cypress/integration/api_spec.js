describe('seach endpoint', () => {
    it('responds', () => {
        cy.request('/api/search?q=hello')
            .then((response) => {
                expect(response.body).to.exist
            })
    })
})


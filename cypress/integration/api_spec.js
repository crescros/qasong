describe('seach endpoint', () => {
    it('responds', () => {
        cy.request('/api/search?q=hello')
            .then((response) => {
                expect(response.body).to.exist
            })
    })
})

describe('auth endpoint', () => {
    it('authenticates test user with proper credentials', () => {
        cy.request('/api/user/authenticate')
            .then((response) => {
                expect(response.body).to.exist
                expect(response).to.exist
            })
    })
})

//
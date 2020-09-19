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
        const postBody = {
            "username": "testuser",
            "password": "testpassword123"
        }

        cy.request('POST', '/api/users/authenticate', postBody)
            .then((response) => {
                expect(response.body.token).to.exist
            })
    })

    it('rejects test user with wrong password', () => {
        const postBody = {
            "username": "testuser",
            "password": "testpasswxrd123"
        }

        cy.request({ method: 'POST', url: '/api/users/authenticate', body: postBody, failOnStatusCode: false })
            .then((response) => {

                expect(response).to.have.property('status', 400)
            })
    })
})


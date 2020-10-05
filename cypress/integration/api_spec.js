describe('seach endpoint', () => {
    it('responds', () => {
        cy.request('/api/search?q=hello')
            .then((response) => {
                expect(response.body).to.exist
                expect(response.status).to.equal(200)
            })
    })
})


// describe('users:create endpoint', () => {
//     it('creates a new user if name does not yet exist', () => {
//         const postBody = {
//             "username": "testuser",
//             "password": "testpassword123"
//         }

//         cy.request({ method: 'POST', url: '/api/users/create', body: postBody, failOnStatusCode: false })
//             .then((response) => {
//                 expect(response.status).to.be.oneOf([200, 400])
//             })
//     })
// })

// describe('users:auth endpoint', () => {
//     it('authenticates test user with proper credentials', () => {
//         const postBody = {
//             "username": "testuser",
//             "password": "testpassword123"
//         }

//         cy.request('POST', '/api/users/authenticate', postBody)
//             .then((response) => {
//                 expect(response.body.token).to.exist
//             })
//     })

//     it('rejects test user with wrong password', () => {
//         const postBody = {
//             "username": "testuser",
//             "password": "testpasswxrd123"
//         }

//         cy.request({ method: 'POST', url: '/api/users/authenticate', body: postBody, failOnStatusCode: false })
//             .then((response) => {
//                 expect(response).to.have.property('status', 400)
//             })
//     })
// })


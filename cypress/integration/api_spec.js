describe("seach endpoint", () => {
  it("responds", () => {
    cy.request("/api/search?q=hello").then((response) => {
      expect(response.body).to.exist;
      expect(response.status).to.equal(200);
    });
  });
});

xdescribe("seach by list of ids endpoint", () => {
  it("responds", () => {
    cy.request(
      "/api/search/ids?queue=9t7Y3puRKM0&queue=juqws1LIH-I&queue=5Sy19X0xxrM&queue=C_yI2959DYU"
    ).then((response) => {
      expect(response.body).to.exist;
      expect(response.status).to.equal(200);
    });
  });
});

describe("env endpoint", () => {
  it("responds", () => {
    cy.request("/api/env").then((response) => {
      expect(response.body).to.exist;
      expect(response.status).to.equal(200);
    });
  });
});

//user endpoint tests are disabled untill we enable user auth
xdescribe("undefined endpoint", () => {
  it("returns a 404", () => {
    cy.request({ url: "/api/search/idxs", failOnStatusCode: false }).then((response) => {
      expect(response.body).to.exist;
      expect(response.status).to.equal(404);
    });
  });
});

xdescribe("users:create endpoint", () => {
  it("creates a new user if name does not yet exist", () => {
    const postBody = {
      username: "testuser",
      password: "testpassword123",
    };

    cy.request({
      method: "POST",
      url: "/api/users/create",
      body: postBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 400]);
    });
  });
});

xdescribe("users:auth endpoint", () => {
  it("authenticates test user with proper credentials", () => {
    const postBody = {
      username: "testuser",
      password: "testpassword123",
    };

    cy.request("POST", "/api/users/authenticate", postBody).then((response) => {
      expect(response.body.token).to.exist;
    });
  });

  it("rejects test user with wrong password", () => {
    const postBody = {
      username: "testuser",
      password: "testpasswxrd123",
    };

    cy.request({
      method: "POST",
      url: "/api/users/authenticate",
      body: postBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response).to.have.property("status", 400);
    });
  });
});

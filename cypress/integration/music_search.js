import { describe } from "mocha";

describe("search page", ()=>{
    beforeEach(()=>{
        cy.visit("/search")
    })

    it("has a search bar", ()=>{
        cy.get("#qasongsearch")
    })

})
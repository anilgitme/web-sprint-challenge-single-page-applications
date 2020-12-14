describe('Testing the application', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    })
    it('Mvp test', () => {
        cy.get('input[name="name"]').type("Anil").should('have.value', "Anil")
        cy.get("#size").select('Large').should('have.value', "Large")
        cy.get('input[name="jalapenos"]').check().should('be.checked')
        cy.get('input[name="pepperoni"]').check().should('be.checked')
        cy.get('input[name="ham"]').check().should('be.checked')
        cy.get('input[name="mushroom"]').check().should('be.checked')
        cy.get('#speciality').type('extra cheese').should('have.value', 'extra cheese')
        cy.get('#submit').click()
    })
})
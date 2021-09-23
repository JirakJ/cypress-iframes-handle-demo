/// <reference types="cypress" />
describe('example how to handle iframe', () => {
    beforeEach(() => {
        cy.visit('https://checkout.avast.com/en-us/ipm?product=5325101400&quantity=1&currency=USD&clearCart=1')
    })

    it('Can fill all fields', () => {
        cy.get('#billingFirstNameCreditCard')
            .should('have.text', '')
            .clear()
            .type("Slavomír")
        cy.get('#billingLastNameCreditCard')
            .should('have.text', '')
            .clear()
            .type("Testovič")

        cy.get('iframe').then($iframe => {
            const $body = $iframe.contents().find('body')[1]
            cy.wrap($body)
                .find('#ccNumber')
                .clear()
                .type("4444333322221111")
        })

        cy.get('iframe').then($iframe => {
            const $body = $iframe.contents().find('body')[2]
            cy.wrap($body)
                .find('#ccExpiry')
                .clear()
                .type("0825")
        })

        cy.get('iframe').then($iframe => {
            const $body = $iframe.contents().find('body')[3]
            cy.wrap($body)
                .find('#ccCVV')
                .clear()
                .type("245")
        })

        cy.get('#billingEmailCreditCard').should('have.text', '').clear().type("slavomir.testovic@avast.com")
        cy.get('#billingCountryCreditCard').should('have.value', 'US')
        cy.get('#billingZipCreditCard').should('have.text', '').clear().type("12345")
        cy.get('.t-paymentInfo_submit').click()
    })

})
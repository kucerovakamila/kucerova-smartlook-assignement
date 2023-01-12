/// <reference types="cypress" />

import { is } from "cypress/types/bluebird"

// This file will contain tests for the Pricing page. Feel free to add as many as you want.

context('Pricing', () => {
    const startupPlanPrice = "879"
    const businessPlanPrice = "2,439"

    beforeEach(() => {
        cy.visit('https://www.smartlook.com/pricing/?currencyCode=CZK')
        cy.get('#onetrust-accept-btn-handler').click()
    })

    it('Startup plan = 879 / monthly', () => {
        cy.get('#pricing-header-block_61d1e0090a032 > div > div > div:nth-child(2)')
        .within(() => {
            cy.get('h4').contains(startupPlanPrice)
        })
    })
    it('Business plan = 2,439 / monthly', () => {
        cy.get('#pricing-header-block_61d1e0090a032 > div > div > div.package.package__highlighted')
        .within(() => {
            cy.get('h4').contains(businessPlanPrice)
        })
    })

    it('startup plan modal opens on click, the price is 879', () => {
        cy.get('#startup-package-button').click()
        cy.get('#startup-package-modal > form > div')
            .should('be.visible')
        cy.get('#startup-package-modal > form > div > div.pricing-modal__package> span')
            .should('contain', startupPlanPrice)
    })

    it('X button on startup plan modal works', () => {
        cy.get('#startup-package-button')
            .click()
        cy.get('#startup-package-modal > form > div')
            .should('be.visible')
        cy.get('#startup-package-modal > form > div > span')
            .click()
        cy.contains('#startup-package-modal > form > div')
            .should('not.exist')
    })

    it('startup plan, data history field is disabled', () => {
        cy.get('#startup-package-button')
            .click()
        cy.get('#startup-package-modal > form > div > div.modal-limits > div:nth-child(2) > select')
            .click()
        cy.once('fail', (e) => {
            expect(e.message).to.include('cy.click()` cannot be called on a `<select>` element. Use `cy.select()` command instead to change the value.')
            return false
          })
    })
    //it('X button on business plan modal works', () => {})
    //it('bussiness plan, drop down field sessions limits works', () => {})
    //it('bussiness plan, drop down field data history works', () => {})
    //it('startup plan, price is 2,239 when session limit is 25k is ', () => {})
    //it('startup plan, price is undefined when drop down field sessions limits is selected as "more"', () => {})
    
    //these^ are a remaning tests I wanted to do but didn't find time to. 
})
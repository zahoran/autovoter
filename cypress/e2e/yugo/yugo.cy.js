const names = require('../../fixtures/names.json')
import {shuffleArray} from "../../support/tools";
shuffleArray(names);

Cypress._.times(names.length, (iterate) => {
    describe('example to-do app', () => {

        it('other email clinet', () => {
            cy.visit('https://generator.email/')
            cy.get('#userName').clear().type(names[iterate].email).blur();
            cy.getCookies().then((data) => {
                cy.log('COOKIES',);
                cy.task('saveCookies', data)
            })
            cy.get('#email_ch_text').should('be.visible').invoke('text').then(data => {
                cy.task('saveData', data)
            })
        })

        it('navigate to delmagyar', () => {
            cy.visit('https://www.delmagyar.hu/kedvenckedvenceink/yugo', { headers: { "Accept-Encoding": "gzip, deflate" } });
            // cy.get('.fc-cta-consent').should('be.visible').scrollIntoView().click();
            cy.get(".fc-cta-consent").click();
            cy.get('.pet-detail-button-vote').should('be.visible').click();
            // cy.get('@email').then((name) => {
            //     cy.log('Student Name: ' + name) //prints name
            // })
            cy.task('getData').then(data => {
                cy.get('#name').type(names[iterate].name);
                cy.get('#email').type(data);
                cy.get(':nth-child(3) > .modal-form-checkbox > .modal-form-checkbox-checkmark').click();
                cy.get(':nth-child(4) > .modal-form-checkbox > .modal-form-checkbox-checkmark').click();
                cy.get('.modal-form-btn').click();
                cy.get('.modal-header-icon');
            })
        });

        it('confirm fake email', () => {
            cy.visit('https://generator.email')
            cy.task('getCookies').then(data => {
                data?.forEach(item => {
                    cy.log('COOKIE', item);
                    cy.setCookie(item.name, item.value)
                })
            });
            cy.reload();
            cy.get('#refresh > .e7m').click();
            // cy.get('#copbtn').should('be.visible').click()
            // cy.wait(1000);
            cy.findByText("Szavazat megerősítése", {timeout: 50000}).should('have.attr', 'href')
                .then((href) => {
                    cy.task('saveURL', href)
                    // cy.log('URL of button', href);
                    // cy.findByText('CSAK SZAVAZNI SZERETNÉK').click();
                });
        });

        it('confirm fake email 2', () => {
            cy.task('getURL').then(url => {
                cy.visit(url, { headers: { "Accept-Encoding": "gzip, deflate" } });
                cy.get(".fc-cta-consent").then($button => {
                    if ($button.is(':visible')) {
                        $button.click();
                    }
                })
                cy.get('.btn-outline').click();
                cy.wait(1000);
            })
        });
    });
});

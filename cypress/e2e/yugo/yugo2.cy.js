const names = require('../../fixtures/names2.json')

Cypress._.times(names.length, (iterate) => {
    describe('example to-do app', () => {

        it('other email clinet', () => {
            cy.visit('https://generator.email/')
            cy.get('#userName').clear().type(names[iterate].email).blur();
            cy.getCookies().then((data) => {
                cy.task('saveEmailCookies', data)
            })
            cy.get('#email_ch_text').should('be.visible').invoke('text').then(data => {
                cy.task('saveData', data)
            })
        })

        it('navigate to delmagyar', () => {
            cy.visit('https://www.delmagyar.hu/kedvenckedvenceink/yugo', { headers: { "Accept-Encoding": "gzip, deflate" } });
            // cy.get('.fc-cta-consent').should('be.visible').scrollIntoView().click();
            cy.get(".fc-cta-consent").click();
            cy.getCookies().then((data) => {
                cy.task('saveDMCookies', data)
            })
            cy.get('.pet-detail-button-vote').should('be.visible').click();
            cy.task('getData').then(data => {
                cy.get('#name').type(names[iterate].name);
                cy.get('#email').type(data);
                cy.get(':nth-child(3) > .modal-form-checkbox > .modal-form-checkbox-checkmark').click();
                cy.get(':nth-child(4) > .modal-form-checkbox > .modal-form-checkbox-checkmark').click();
                cy.get('.modal-form-btn').click();
                cy.get('.modal-header-icon', {timeout: 10000});
            })
        });

        it('confirm fake email', () => {
            cy.task('getEmailCookies').then(data => {
                data?.forEach(item => {
                    cy.log('COOKIE', item);
                    cy.setCookie(item.name, item.value)
                })
            });
            cy.visit('https://generator.email')
            cy.findByText("Szavazat megerősítése", {timeout: 10000}).should('have.attr', 'href')
                .then((href) => {
                    cy.task('saveURL', href)
                    // cy.log('URL of button', href);
                    // cy.findByText('CSAK SZAVAZNI SZERETNÉK').click();
                });
        });

        it('confirm fake email 2', () => {
            cy.task('getURL').then(url => {
                cy.task('getDMCookies').then(data => {
                    data?.forEach(item => {
                        cy.setCookie(item.name, item.value)
                    })
                });
                cy.visit(url, { headers: { "Accept-Encoding": "gzip, deflate" } });
                cy.get('.btn-outline').click();
                cy.get('.modal-header-title').should('be.visible');
            })
        });
    });
});

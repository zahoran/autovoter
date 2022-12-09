var decode = require('decode-html');

describe('example to-do app', () => {
    const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
    Cypress.on('uncaught:exception', (err) => {
        /* returning false here prevents Cypress from failing the test */
        if (resizeObserverLoopErrRe.test(err.message)) {
            return false
        }
    })
    it('mailto', () => {
        cy.visit('https://tempmail.plus/')
        cy.get('#pre_button').should('be.visible').clear().type('testtmail').blur();
        cy.get('#pre_copy').click();
        cy.getCookies().then((data) => {
            const emailObject = data.find(item => item.name === 'email');
            let email;
            if (emailObject) {
                email = emailObject.value;
                email = email.replace('%40', '@');
            }
            cy.log(data['email']);
        })
        // cy.getCookies().then((data) => {
        //     cy.task('saveEmailCookies', data)
        // })
        // cy.get('#email_ch_text').should('be.visible').invoke('text').then(data => {
        //     cy.task('saveData', data)
        // })
    })
});

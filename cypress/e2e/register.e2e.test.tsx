import { hasOperationName } from "../../graphql/cypressTestUtils";
import { SERVER_URL } from "../../variables";


describe('/register', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/register');
        cy.intercept('POST', SERVER_URL, (req) => {
            if (hasOperationName(req, 'Register')) {
                req.alias = 'gqlRegisterMutation';
                req.reply(res => {
                    res.body.data = {
                        register: {
                            valid: true
                        }
                    };
                });
            }
        });
    });

    it('should show login form and submission works', () => {
        cy.get(`[data-test="registerForm"]`).should('be.visible');

        cy.get(`[data-test="registerUsername"]`).type('Hello');
        cy.get(`[data-test="registerEmail"]`).type('helloworld@gmail.com');
        cy.get(`[data-test="registerPassword"]`).type('World');
        cy.get(`[data-test="registerTermsAndServices"]`).click();
        cy.get(`[data-test="registerSubmitButton"]`).click();

        cy  .wait('@gqlRegisterMutation')
            .its('response.body.data.register')
            .should('have.property', 'valid')
            .and('equal', true);
    });

});

import { hasOperationName } from "../../graphql/cypressTestUtils";
import { SERVER_URL } from "../../variables";


describe('/index', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.intercept('POST', SERVER_URL, req => {
            if (hasOperationName(req, 'Login')) {
                req.alias = 'gqlLoginMutation';
                req.reply(res => {
                    res.body.data.login.valid = true;
                });
            }
        });
    });

    it('should display login form if not logged in and submission works', () => {
        cy.get(`[data-test="loginForm"]`).should('be.visible');
        
        cy.get(`[data-test="loginUsername"]`).type('Hello');
        cy.get(`[data-test="loginPassword"]`).type('World');
        cy.get(`[data-test="loginSubmitButton"]`).click();
        
        cy  .wait('@gqlLoginMutation')
            .its('response.body.data.login')
            .should('have.property', 'valid')
            .and('equal', true);
    });

});

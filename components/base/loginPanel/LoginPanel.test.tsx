import { mount } from "cypress/react";
import { SERVER_URL } from "../../../variables";
import { hasOperationName } from "../../../graphql/cypressTestUtils";
import { Providers } from "../../../pages/_app";
import LoginPanel from "./LoginPanel";


describe('<LoginPanel>', () => {
    it('should login client', () => {
        mount(
            <Providers>
                <LoginPanel />
            </Providers>
        );

        cy.intercept('POST', SERVER_URL, req => {
            if (hasOperationName(req, 'Login')) {
                req.alias = 'gqlLoginMutation'
                req.reply((res) => {
                  res.body.data.login.valid = true;
                });
              }
        });

        cy.get(`[data-test="username"]`).type('Hello');
        cy.get(`[data-test="password"]`).type('World');
        cy.get(`[data-test="login"]`).click();

        cy  .wait('@gqlLoginMutation')
            .its('response.body.data.login')
            .should('have.property', 'valid')
            .and('equal', true);
    });
});

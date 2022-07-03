import { mount } from "cypress/react";
import { User } from "../../../graphql/types";
import { Providers } from "../../../pages/_app";
import Topbar from "./Topbar";


describe('<Topbar>', () => {

    it('should open and close all collapsible menus', () => {
        mount(
            <Providers>
                <Topbar />
            </Providers>
        );

        const menus = ['add-user', 'notifications'];
        for (const menu of menus) {
            const button = `#${menu}-icon`;
            const collapsible = `#${menu}-collapsed`;

            cy.get(collapsible).should('not.be.visible');
            cy.get(button).click();
            cy.get(collapsible).should('be.visible');
            cy.get(button).click();
            cy.get(collapsible).should('not.be.visible');
        }
    });

    it('should load login link if not logged in', () => {
        mount(
            <Providers>
                <Topbar />
            </Providers>
        );
        cy.get(`[data-test="loginLink"]`).should('be.visible');
        cy.get(`[data-test="accountLink"]`).should('not.exist');
    });

    it('should load account link if logged in', () => {
        mount(
            <Providers>
                <Topbar user={{ profilePicture: null } as User} />
            </Providers>
        );
        cy.get(`[data-test="loginLink"]`).should('not.exist');
        cy.get(`[data-test="accountLink"]`).should('be.visible');
    });

});

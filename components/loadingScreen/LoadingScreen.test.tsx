import { mount } from "cypress/react";
import LoadingScreen from "./LoadingScreen";

describe('<LoadingScreen>', () => {

    it('should be open', () => {
        mount(<LoadingScreen open={true} />);
        cy.get(`[data-test="loadingScreen"]`).should('be.visible');
    });

    it('should be closed', () => {
        mount(<LoadingScreen open={false} />);
        cy.get(`[data-test="loadingScreen"]`).should('not.be.visible');
    });

});

import { mount } from "cypress/react";
import LinksPanel from "./LinksPanel";


describe('<LinksPanel>', () => {

    it('should contain all links', () => {
        mount(<LinksPanel />);
        // links exist
        cy.get(`[data-test="activity"]`).contains('Activity', { matchCase: false });
        cy.get(`[data-test="likes"]`).contains('Likes', { matchCase: false });
    });

});

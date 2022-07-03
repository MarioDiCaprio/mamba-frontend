import { mount } from "cypress/react";
import Popup from "./Popup";


describe('<Popup>', () => {

    it('should be open', () => {
        mount(<Popup open={true} />);
        cy.get(`[data-test="popup"]`).should('be.visible');
    });

    it('should be closed', () => {
        mount(<Popup open={false} />);
        cy.get(`[data-test="popup"]`).should('not.be.visible');
    });

});

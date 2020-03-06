import { Then } from 'cypress-cucumber-preprocessor/steps';

const hasParagraph = paragraph => {
  cy.get('p').contains(paragraph);
};

Then("the paragraph '{}' is displayed", paragraph => {
  hasParagraph(paragraph);
});

export default hasParagraph;
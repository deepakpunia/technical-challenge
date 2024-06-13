describe('Rancher UI Test', () => {
  const ip = '127.0.0.1';
  const rancherTestPass = 'TestPassword@123'
  // Get the Rancher temp password
  const getPassword = () => {
    return cy.exec(`sudo docker logs $(sudo docker ps -aqf name=rancher_ui) 2>&1 | grep -i 'Bootstrap Password:'`)
      .then((result) => {
        const output = result.stdout;
        const password = output.split(' ').pop().trim();
        return password;
      });
  };

  it('Logs into Rancher web page', () => {
    getPassword().then((pwd) => {
      cy.visit(`http://${ip}/dashboard/auth/login`);

      // Login Rancher Web page
      cy.get('#password input').type(pwd);
      cy.get('[data-testid="login-submit"] > span').click();

      cy.wait(10000);
      cy.get(':nth-child(2) > .radio-container > .labeling > .radio-label > span').click();
      cy.get('[data-testid="setup-password"] > .labeled-input > input').clear(rancherTestPass);
      cy.get('[data-testid="setup-password"] > .labeled-input > input').type(rancherTestPass);
      cy.get('[data-testid="setup-password-confirm"] > .labeled-input > input').clear(rancherTestPass);
      cy.get('[data-testid="setup-password-confirm"] > .labeled-input > input').type(rancherTestPass);
      cy.get('[data-testid="setup-agreement"] > .checkbox-container > .checkbox-custom').click();
      cy.get('[data-testid="setup-submit"] > span').click();

      cy.wait(10000);
      cy.get('.body > :nth-child(1) > .option > .has-tooltip').click();
    });
  });

  it('Checks if the main web page opens up', () => {
    cy.visit(`http://${ip}//dashboard/home`);
    cy.wait(10000);
    cy.get('[data-testid="local-login-username"]').type('admin');
    cy.get('[data-testid="local-login-password"] > .labeled-input > input').clear();
    cy.get('[data-testid="local-login-password"] > .labeled-input > input').type(rancherTestPass);
    cy.get('[data-testid="login-submit"]').click();
    cy.get('.body > :nth-child(1) > .option > .has-tooltip').click();

    cy.wait(10000);
    cy.url().should('include', '/dashboard/home');
  });

  it('Checks if the main web page title is correct', () => {
    cy.visit(`http://${ip}//dashboard/home`);
    cy.get('[data-testid="local-login-username"]').type('admin');
    cy.get('[data-testid="local-login-password"] > .labeled-input > input').clear();
    cy.get('[data-testid="local-login-password"] > .labeled-input > input').type(rancherTestPass);
    cy.get('[data-testid="login-submit"]').click();

    cy.wait(10000);

    cy.title().should('eq', 'Rancher');
  });
});

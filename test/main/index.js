var conf = require('../../nightwatch.conf.js');

module.exports = {
    'login': function (browser) {
        const data = browser.globals.data;
        const page = browser.page.login();

        page
            .navigate()
            .waitForElementVisible('body')
            .assert.title('Timelapse')
            .waitForElementVisible('@loginForm')
            .setValue('@email', data.email)
            .setValue('@password', data.password)
            .submitForm('@loginForm')
            .waitForElementVisible('@logoutBtn')
            .waitForElementVisible('@todos')
            .click('@logoutBtn');

        browser.end();
    }
};

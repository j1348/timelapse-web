var conf = require('../../nightwatch.conf.js');

module.exports = {
    commands: [
        {
            login: function() {
                return this.waitForElementVisible('body', 1000)
                    .assert.title('Timelapse')
                    .waitForElementVisible('@loginMenu')
                    .click('@loginMenu');
            },
        },
    ],
    url: function() {
        return process.env.BASE_URL;
    },
    elements: {
        loginMenu: 'a[name="login"]',
    },
};

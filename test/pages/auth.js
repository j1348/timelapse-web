var conf = require('../../nightwatch.conf.js');

module.exports = {
    commands: [
        {
            login: function(email, password) {
                return this.waitForElementVisible('@loginForm')
                    .setValue('@email', email)
                    .setValue('@password', password)
                    .submitForm('@loginForm');
            },
            logout: function() {
                return this.waitForElementVisible('@todos');
                this.waitForElementVisible('@logoutBtn').click('@logoutBtn');
            },
        },
    ],
    url: function() {
        return process.env.BASE_URL;
    },
    elements: {
        email: 'input[name="email"]',
        password: 'input[name="password"]',
        loginForm: 'form[name="login"]',
        todos: '.todos',
        logoutBtn: '.logout-form button[name="close"]',
    },
};

var conf = require('../../nightwatch.conf.js');

module.exports = {
    commands: [{
        capture: function(filename) {
            //this.api.saveScreenshot(conf.imgpath(this.api) + filename);
            return this;
        }
    }],
    url: function () {
        return this.api.globals.data.url;
    },
    elements: {
        email: 'input[name="email"]',
        password: 'input[name="password"]',
        loginForm: 'form[name="login"]',
        logoutBtn: '.logout-form button.btn-small',
        todos: '.todos'
    }
};

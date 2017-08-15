var conf = require('../../nightwatch.conf');
const { email, password } = require('../context/index');

module.exports = {
    login: function(browser) {
        const auth = browser.page.auth();
        const menu = browser.page.menu();

        menu.navigate().login();

        auth.login(email, password).logout();
    },
};

// Sample of conditional testing
//
// browser.element('css selector', 'a[name="login"]', function(result){
//     if (result.value) {
//         console.log(result.value);
//         // Element is present, do the appropriate tests
//     } else {
//         // Element is not present.
//     }
// });

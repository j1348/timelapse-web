/* eslint-disable import/no-commonjs */
const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [autoprefixer({ browsers: '> 1%, Last 2 versions, IE 9' })],
};

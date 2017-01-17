import React from 'react';
import ReactDOM from 'react-dom';
import 'medium-draft/lib/index.css';
import App from './App';

require('string.prototype.startswith');
require('../css/style.scss');

ReactDOM.render(<App />, document.getElementById('main'));

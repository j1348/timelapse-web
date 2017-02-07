import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import 'string.prototype.startswith';
import 'medium-draft/lib/index.css';
import Raven from 'raven-js';
import Header from './Header';
import Login from './Login';
import SignUp from './SignUp';
import App from './App';
import '../css/style.scss';

Raven.debug = (process.env.NODE_ENV !== 'production');
Raven
    .config('https://9b7d1cedf93249389f90839b13dbf4c5@sentry.io/129263')
    .install();

render((
    <Router history={hashHistory}>
        <Route path="/" component={Header} >
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
        </Route>
        <Route path="/token/:token" component={App} />
    </Router>
), document.getElementById('main'));

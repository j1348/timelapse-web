import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import 'string.prototype.startswith';
import 'medium-draft/lib/index.css';
import Header from './Header';
import Login from './Login';
import SignUp from './SignUp';
import App from './App';
import '../css/style.scss';

render((
    <Router history={hashHistory}>
        <Route path="/" component={Header} >
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
        </Route>
        <Route path="/token/:token" component={App} />
    </Router>
), document.getElementById('main'));

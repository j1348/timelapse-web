import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Login from './Login';
import SignUp from './SignUp';
import 'string.prototype.startswith';
import 'medium-draft/lib/index.css';
import 'react-s-alert/dist/s-alert-default.css';
import Raven from 'raven-js';
import Header from './Header';
import App from './App';
import '../css/style.scss';

const SENTRY = 'https://9b7d1cedf93249389f90839b13dbf4c5@sentry.io/129263';

Raven.config(process.env.NODE_ENV !== 'production' ? '' : SENTRY).install();

render(
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Header}/>
            <Route path="/token/:token" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
        </Switch>
    </HashRouter>,
    document.getElementById('main')
);

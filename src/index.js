import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import RouteWithSubRoutes from './router/RouteWithSubRoutes'
import {Switch} from 'react-router';
import 'string.prototype.startswith';
import 'medium-draft/lib/index.css';
import 'react-s-alert/dist/s-alert-default.css';
import Raven from 'raven-js';
import Header from './Header';
import Login from './Login';
import SignUp from './SignUp';
import App from './App';
import '../css/style.scss';

const routes = [
  { 
    path: '/',
    component: Header,
    routes: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/signup',
        component: SignUp,
      },
    ],
  },
]

const SENTRY = 'https://9b7d1cedf93249389f90839b13dbf4c5@sentry.io/129263';

Raven.config(process.env.NODE_ENV !== 'production' ? '' : SENTRY).install();

render(
    <Router>
        <Switch>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route}/>
            ))}
        </Switch>    
    </Router>,
    document.getElementById('main')
);  

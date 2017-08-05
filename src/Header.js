import React from 'react';
import { Link } from 'react-router';
import Alert from 'react-s-alert';

export default function (props) {
    return (<div className="header">
              <Alert stack={{ limit: 1 }} />
              <div className="header-col">
                <h2>Smashing Time</h2>
              </div>
              <div className="header-col">
                <nav className="nav">
                  <ul>
                    <li><Link to="/login" name="login" activeClassName="active">Login</Link></li>
                    <li><Link to="/signup" name="signup" activeClassName="active">Sign-Up</Link></li>
                   </ul>
                </nav>
                {props.children}
              </div>
            </div>);
}


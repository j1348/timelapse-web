import React from 'react';
import { Link } from 'react-router';

export default function (props) {
    return (<div className="header">
              <div className="header-col">
                <h1>Timelapse</h1>
              </div>
              <div className="header-col">
                <nav className="nav">
                  <ul>
                    <li><Link to="/login" activeClassName="active">Login</Link></li>
                    <li><Link to="/signup" activeClassName="active">Sign-Up</Link></li>
                   </ul>
                </nav>
                {props.children}
              </div>
            </div>);
}


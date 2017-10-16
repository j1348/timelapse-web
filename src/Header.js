import React from 'react';
import { NavLink } from 'react-router-dom'
import Alert from 'react-s-alert';

export default function(props) {
    return (
        <div>
            <div className="header">
                <Alert stack={{ limit: 1 }} />
                <div className="header-col">
                    <h2>Smashing Time</h2>
                </div>
                <div className="header-col">
                    <nav className="nav">
                        <ul>
                            <li>
                                <NavLink
                                    to="/login"
                                    name="login"
                                    activeClassName="active"
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/signup"
                                    name="signup"
                                    activeClassName="active"
                                >
                                    Sign-Up
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

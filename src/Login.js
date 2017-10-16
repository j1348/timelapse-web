import React from 'react';
import { Route, withRouter } from "react-router-dom";
import LoginForm from './components/login/LoginForm';
import Header from './Header';

function Login(props) {
    return (
        <div>
            <Route path="/" component={Header}/>
            <LoginForm
                onSuccess={token => {
                    props.history.push(`/token/${token}`);
                }}
            />
        </div>
    );
}

export default withRouter(Login)

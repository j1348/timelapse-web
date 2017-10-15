import React from 'react';
import {withRouter} from "react-router-dom";
import LoginForm from './components/login/LoginForm';

function Login(props) {
    return (
        <LoginForm
            onSuccess={token => {
                props.history.push(`/#/token/${token}`);
                window.location.reload();
            }}
        />
    );
}

export default withRouter(Login)

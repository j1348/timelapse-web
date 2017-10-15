import React from 'react';
import SignUpForm from './components/signup/SignUpForm';
import {withRouter} from "react-router-dom";

function SignUp(props) {
    return (
        <SignUpForm
            onSuccess={token => {
                props.history.push(`/#/token/${token}`);
                window.location.reload();
            }}
        />
    );
}

export default withRouter(SignUp)

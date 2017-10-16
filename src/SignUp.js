import React from 'react';
import SignUpForm from './components/signup/SignUpForm';
import {withRouter, Route} from "react-router-dom";
import Header from './Header';

function SignUp(props) {
    return (
        <div>
            <Route path="/" component={Header}/>
            <SignUpForm
                onSuccess={token => {
                    props.history.push(`/token/${token}`);
                }}
            />
        </div>
    );
}

export default withRouter(SignUp)

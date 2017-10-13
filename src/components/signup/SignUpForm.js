import React from 'react';
import Alert from 'react-s-alert';
import render from 'react-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const API_URL = process.env.API_URL;
// create a google recaptcha key in https://www.google.com/recaptcha/admin#list and add to .env;
const API_GOOGLE_KEY = process.env.API_GOOGLE_KEY;

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onSubmit(e) {
        const target = e.target;
        const body = {
            name: target[0].value,
            username: target[1].value,
            email: target[2].value,
            password: target[3].value,
        };

        e.preventDefault();

        fetch(`${API_URL}/user`, {
            method: 'POST',
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    Alert.warning(data.message, {
                        position: 'top',
                        timeout: 5000,
                    });
                    return;
                }

                this.props.onSuccess(data.token);
                setTimeout(() => {
                    target.submit();
                }, 0);
            });
    }

    render() {
        return (
            <form
                name="signup"
                target="dummy"
                onSubmit={e => {
                    this.onSubmit(e);
                }}
                className="signup-form"
                method="POST"
            >
                <div className="form-control">
                    <label htmlFor="name">name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        aria-required="true"
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="username">username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        aria-required="true"
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="email">email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="off"
                        aria-required="true"
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="password">password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="off"
                        aria-required="true"
                    />
                </div>
                <div className="form-control">
                    <ReCAPTCHA
                        ref="recaptcha"
                        sitekey= {API_GOOGLE_KEY}
                    />
                </div>
                <div className="form-control">
                    <button type="submit">Sign-Up</button>
                </div>
            </form>
        );
    }
}

SignUpForm.propTypes = {
    onSuccess: React.PropTypes.func.isRequired,
};

export default SignUpForm;
import React, { Component } from 'react';
import SignUpForm from './components/signup/SignUpForm';

export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (<SignUpForm />);
    }
}

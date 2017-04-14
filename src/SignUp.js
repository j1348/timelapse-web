import React from 'react';
import { browserHistory } from 'react-router';
import SignUpForm from './components/signup/SignUpForm';

export default function () {
    return (<SignUpForm
      onSuccess={(token) => {
          browserHistory.push(`/#/token/${token}`);
          window.location.reload();
      }}
    />);
}

import React from 'react';
import { browserHistory } from 'react-router';
import LoginForm from './components/login/LoginForm';

export default function () {
    return (<LoginForm
      onLogin={(token) => {
          browserHistory.push(`/#/token/${token}`);
          window.location.reload();
      }}
    />);
}

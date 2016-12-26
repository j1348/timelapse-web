import React, { Component } from 'react';
import LoginForm from './components/login/LoginForm';
import Todos from './components/todo/Todos';
// import Timeline from './components/timeline/Timeline';

export default class App extends Component {
    constructor() {
        super();
        this.state = {};
    }
    onLogin(token) {
        this.state.token = token;
        this.setState({ token });
    }
    onLogout() {
        this.state = {};
        this.setState({});
    }
    render() {
        let content = '';

        if (this.state.token) {
            content = (<Todos token={this.state.token} />);
            // content = (<Timeline />);
        }

        return (<div className="container">
          <LoginForm
            onLogin={(token) => { this.onLogin(token); }}
            onLogout={() => { this.onLogout(); }}
          />
          { content }
        </div>);
    }
}

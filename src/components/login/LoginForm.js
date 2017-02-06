import React from 'react';
import { getToken } from './token';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
        const token = getToken();
        if (token) {
            this.state = { token };
            this.props.onLogin(token);
        }
    }
    disconnect() {
        this.setState({ token: null });
    }
    render() {
        return (<form name="login" action={`${process.env.API_URL}/user/login`} className="login-form" method="POST">
          <div className="form-control">
            <label htmlFor="email">email</label>
            <input type="text" name="email" id="email" aria-required="true" />
          </div>
          <div className="form-control">
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" aria-required="true" />
          </div>
          <div className="form-control">
            <button type="submit">Log-In</button>
          </div>
        </form>);
    }
}

LoginForm.propTypes = {
    onLogin: React.PropTypes.func.isRequired
};

export default LoginForm;

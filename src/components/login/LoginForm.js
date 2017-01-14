import React from 'react';
import { getToken, resetToken } from './token';

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
        resetToken();
        this.setState({ token: null });
        this.props.onLogout();
    }

    render() {
        if (this.state.token) {
            document.body.classList.add('logged');
            return (<div className="login-form">
              <div className="form-control">
                <button className="btn-small" type="button" onClick={() => { this.disconnect(); }}>
                  <svg className="icon-disconnect">
                    <use xlinkHref="#icon-disconnect" />
                  </svg>
                </button>
              </div>
            </div>);
        }

        document.body.classList.remove('logged');

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
            <button type="submit">Sign-In</button>
          </div>
        </form>);
    }
}

LoginForm.propTypes = {
    onLogin: React.PropTypes.func,
    onLogout: React.PropTypes.func
};

export default LoginForm;

import React from 'react';
import { getToken } from './token';

const API_URL = process.env.API_URL;

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
    onSubmit(e) {
        const target = e.target;
        e.preventDefault();

        fetch(`${API_URL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                email: target[0].value, // this.state.email,
                password: target[1].value // this.state.password
            })
        }).then(response => response.json())
        .then((data) => {
            // console.log(data);
            if (data.error) {
                alert(data.message);
                return;
            }

            this.props.onLogin(data.token);
            setTimeout(() => { target.submit(); }, 0);
        });
    }
    disconnect() {
        this.setState({ token: null });
    }
    render() {
        return (<form name="login" target="dummy" onSubmit={(e) => { this.onSubmit(e); }} method="POST">
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

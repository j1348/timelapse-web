import React from 'react';
import Alert from 'react-s-alert';
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
        const self = this;
        const target = e.target;
        e.preventDefault();

        fetch(`${API_URL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                email: target[0].value,
                password: target[1].value
            })
        }).then(response => response.json())
        .then((data) => {
            if (data.error) {
                self.email.value = '';
                self.password.value = '';
                self.setState({});
                Alert.warning(data.message, {
                    position: 'top',
                    timeout: 5000
                });
                return;
            }

            this.props.onSuccess(data.token);
            setTimeout(() => { target.submit(); }, 0);
        });
    }
    handleInputChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }
    disconnect() {
        this.setState({ token: null });
    }
    render() {
        return (<form name="login" target="dummy" onSubmit={(e) => { this.onSubmit(e); }} method="POST">
          <div className="form-control">
            <label htmlFor="email">email</label>
            <input type="text" name="email" id="email" ref={(val) => { this.email = val; }} onChange={(e) => { this.handleInputChange(e); }} aria-required="true" />
          </div>
          <div className="form-control">
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" ref={(val) => { this.password = val; }} onChange={(e) => { this.handleInputChange(e); }} aria-required="true" />
          </div>
          <div className="form-control">
            <button type="submit">Log-In</button>
          </div>
        </form>);
    }
}

LoginForm.propTypes = {
    onSuccess: React.PropTypes.func.isRequired
};

export default LoginForm;

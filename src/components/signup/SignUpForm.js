import React from 'react';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<form name="signup" action={`${process.env.API_URL}/user`} className="signup-form" method="POST">
          <div className="form-control">
            <label htmlFor="name">name</label>
            <input type="text" name="text" id="name" aria-required="true" />
          </div>
          <div className="form-control">
            <label htmlFor="username">username</label>
            <input type="text" name="text" id="username" aria-required="true" />
          </div>
          <div className="form-control">
            <label htmlFor="email">email</label>
            <input type="text" name="email" id="email" autoComplete="off" aria-required="true" />
          </div>
          <div className="form-control">
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" autoComplete="off" aria-required="true" />
          </div>
          <div className="form-control">
            <button type="submit">Sign-Up</button>
          </div>
        </form>);
    }
}

export default SignUpForm;

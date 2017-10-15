import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import { resetToken } from "./components/login/token";
import Todos from "./components/todo/Todos";
// import Timeline from './components/timeline/Timeline';

class App extends Component {
    constructor() {
        super();
        this.state = {};
    }
    componentWillMount() {
        this.state.token = this.props.params.token;
        this.props.history.push("/#/");
    }
    disconnect() {
        resetToken();
        this.state.token = null;
        this.props.history.push("/");
        window.location.reload();
    }
    render() {
        return (
            <div className="container">
                <Todos token={this.state.token} />
                <div className="logout-form">
                    <div className="form-control">
                        <button
                            name="close"
                            onClick={() => {
                                this.disconnect();
                            }}
                        >
                            <svg className="icon-disconnect">
                                <use xlinkHref="#icon-disconnect" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(App)

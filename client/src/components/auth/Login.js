import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    //onChange
    onChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }//onChange

    //onSubmit
    onSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            email: this.state.email,
            password:this.state.password
        }
        this.props.loginUser(newUser);
    }//onSubmit

    //componentDidMount
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }//componentDidMount

    //componentWillReceiveProps
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
        if (nextProps.errors) {
            this.setState({ errors:nextProps.errors });
        }
    }//componentWillReceiveProps

    render() {

        const { email, password, errors } = this.state;

        return (<div className="row">
        <div className="col s12 m6 offset-m3">
            <div className="card register-card">
                <div className="card-content">
                    <span className="card-title">Login</span>
                    <p className="text-center">Login to write posts</p>
                    <form className="row" onSubmit={this.onSubmit} noValidate>

                        <div className="input-field col s12">
                            <input 
                                placeholder="Email" 
                                type="email" 
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                className="validate" />
                            { errors.email ? <span className="helper-text error">{errors.email}</span> : null }
                        </div>

                        <div className="input-field col s12">
                            <input 
                                placeholder="Password" 
                                type="password" 
                                name="password"
                                value={password}
                                onChange={this.onChange}
                                className="validate" />
                            { errors.password ? <span className="helper-text error">{errors.password}</span> : null }
                        </div>

                        <div className="input-field col s12 text-center">
                            <button 
                                type="submit" 
                                className="waves-effect waves-light btn green">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>)
    }
}

const mapStateToProps = (state) => ({
    auth:state.auth,
    errors:state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);

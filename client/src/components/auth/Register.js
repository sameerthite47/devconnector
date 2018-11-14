import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            password:'',
            password2:'',
            errors:{}
        }
    }

    //onChange
    onChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]:event.target.value});
    }//onChange

    //onSubmit
    onSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2
        }

        this.props.registerUser(newUser, this.props.history);
    }//onSubmit

    //componentDidMount
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }//componentDidMount

    //componentWillReceiveProps
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors:nextProps.errors });
        }
    }//componentWillReceiveProps

    render() {

        const { name, email, password, password2, errors } = this.state;

        return (
            <div className="row">
                <div className="col s12 m6 offset-m3">
                    <div className="card register-card">
                        <div className="card-content">
                            <span className="card-title">Sign Up</span>
                            <p className="text-center">Create your free account</p>
                            <form noValidate className="row" onSubmit={this.onSubmit}>
                                <div className="input-field col s12">
                                    <input 
                                        placeholder="Name" 
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={this.onChange}
                                        className="validate" />
                                    { errors.name ? <span className="helper-text error">{errors.name}</span> : null }
                                    
                                </div>

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

                                <div className="input-field col s12">
                                    <input 
                                        placeholder="Confirm Password" 
                                        type="password"
                                        name="password2"
                                        value={password2} 
                                        onChange={this.onChange}
                                        className="validate" />
                                    { errors.password2 ? <span className="helper-text error">{errors.password2}</span> : null }
                                </div>

                                <div className="input-field col s12 text-center">
                                    <button 
                                        type="submit" 
                                        className="waves-effect waves-light btn green">
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth:state.auth,
    errors:state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));

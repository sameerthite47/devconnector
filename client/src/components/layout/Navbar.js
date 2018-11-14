import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {

    state = {
        show:false
    }

    //logoutClick
    logoutClick = (event) => {
        event.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }//logoutClick

    //toggleMenu
    toggleMenu = (event) => {
        event.preventDefault();
        this.setState({show:!this.state.show});
    }//toggleMenu

    render() {

        const { show } = this.state;
        const { isAuthenticated, user } = this.props.auth;

        return (<div className="navbar-fixed">
        <nav className="blue darken-2">
            <div className="container">
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">DevBlog</Link>
                    <a className="sidenav-trigger" onClick={this.toggleMenu}>
                        <i className="material-icons fa fa-bars"></i>
                    </a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/profiles">Developers</Link></li>
                        {
                            isAuthenticated
                            ? <li><Link to="/feed">Post Feed</Link></li>
                            : null
                        }
                        { isAuthenticated ? <li><Link to="/dashboard">Dashboard</Link></li> : null }
                        { !isAuthenticated ? <li><Link to="/register">Sign Up</Link></li> : null }
                        { !isAuthenticated ? <li><Link to="/login">Login</Link></li> : null }
                        { isAuthenticated 
                            ? <li>
                                <a onClick={this.logoutClick}>
                                    <img src={user.avatar} alt={user.name} className="circle user-avatar" />
                                    <span style={{marginLeft:'5px'}}>Logout</span>
                                </a>
                                </li> 
                            : null 
                        }
                        
                    </ul>

                    <ul className={classnames('sidenav', { 'show-sidebar':show })} id="mobile-demo">
                    
                    <li><Link to="/profiles">Developers</Link></li>
                        {
                            isAuthenticated
                            ? <li><Link to="/feed">Post Feed</Link></li>
                            : null
                        }
                        { isAuthenticated ? <li><Link to="/dashboard">Dashboard</Link></li> : null }
                        { !isAuthenticated ? <li><Link to="/register">Sign Up</Link></li> : null }
                        { !isAuthenticated ? <li><Link to="/login">Login</Link></li> : null }
                        { isAuthenticated 
                            ? <li>
                                <a onClick={this.logoutClick}>
                                    <img src={user.avatar} alt={user.name} className="circle user-avatar" />
                                    <span style={{marginLeft:'5px'}}>Logout</span>
                                </a>
                                </li> 
                            : null 
                        }
                    </ul>
                </div>
            </div>
        </nav></div>)
    }
}

const mapStateToProps = (state) => ({
    auth:state.auth 
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);

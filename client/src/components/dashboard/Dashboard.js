import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';

//Components
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';


class Dashboard extends Component {

    //componentDidMount
    componentDidMount() {
        this.props.getCurrentProfile();
    }//componentDidMount

    //onDeleteClick
    onDeleteClick = (event) => {
        event.preventDefault();
        this.props.deleteAccount();
    }//onDeleteClick

    render() {

        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner />
        } else {
            //Check if logged in user has profile data
            if (Object.keys(profile).length > 0) {
                dashboardContent = <div>
                    <h5>Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></h5>
                    <ProfileActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <button className="waves-effect waves-light btn red mt-5" onClick={this.onDeleteClick}>
                        <i className="fa fa-user-times mr-2" style={{fontSize:'1rem'}}></i>
                        Delete My Account
                    </button>
                </div>
            } else {
                dashboardContent = <div>
                    <h5>Welcome {user.name}</h5>
                    <p>You have not yet setup a profile, please add some info.</p>
                    <Link to="/create-profile" className="waves-effect waves-light btn green">Create Profile</Link>
                </div>
            }
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        {dashboardContent}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
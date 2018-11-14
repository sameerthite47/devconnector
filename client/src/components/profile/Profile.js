import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileByHandle } from '../../actions/profileActions';

//Components
import Spinner from '../common/Spinner';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';

class Profile extends Component {

    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile === null && this.props.profile.loading) {
            this.props.history.push('/not-found');
        }
    }

    render() {

        const { profile, loading } = this.props.profile;

        let profileContent;

        if (profile === null || loading) {
            profileContent = <Spinner />;
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col s6">
                            <Link to="/profiles" className="waves-effect waves-light btn white btn-login mt-4">Back To Profiles</Link>
                        </div>
                        <div className="col s6" />
                    </div>
                    <ProfileHeader profile={profile} />
                    <ProfileAbout profile={profile} />
                    <ProfileCreds
                        education={profile.education}
                        experience={profile.experience}
                    />
                </div>
            );
        }

        return (
            <div className="row">
                <div className="col s12">
                    { profileContent }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);

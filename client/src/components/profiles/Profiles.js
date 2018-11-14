import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../actions/profileActions';

//Components
import ProfileItem from './ProfileItem';


class Profiles extends Component {

    componentDidMount() {
        this.props.getProfiles();
    }

    render() {

        const { profiles, loading } = this.props.profile;
        let profileItems;

        if (profiles === null || loading) {
            profileItems = <Spinner />;
        } else {
            if (profiles.length > 0) {
                profileItems = profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                ));
            } else {
                profileItems = <h4>No profiles found...</h4>;
            }
        }

        return (
            <div>
                <div className="row">
                    <div className="col s12">
                        <h4>Developer Profiles</h4>
                        <p>Browse and connect with developers</p>
                        {profileItems}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);

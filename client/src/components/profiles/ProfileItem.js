import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
    render() {
        const { profile } = this.props;

        return (
            <div className="card mb-3">
                <div className="card-content">
                    <div className="row">
                        <div className="col s12 m2">
                            <img src={profile.user.avatar} alt="" className="responsive-img circle" />
                        </div>
                        <div className="col s12 m10">
                            <h4 className="mt-0">{profile.user.name}</h4>
                            <h6>
                                <i className="fa fa-briefcase mr-2"></i>
                                {profile.status}{' '}
                                {isEmpty(profile.company) ? null : (
                                    <span>at {profile.company}</span>
                                )}
                            </h6>
                            <h6>
                                <i className="fa fa-map mr-2"></i>
                                {isEmpty(profile.location) ? null : (
                                    <span>{profile.location}</span>
                                )}
                            </h6>
                            <Link
                                to={`/profile/${profile.handle}`}
                                className="waves-effect waves-light btn green mt-2">
                                View Profile
                            </Link>

                            <h5>Skills</h5>
                            {
                                profile.skills.slice(0, 10).map((skill, index) => (
                                    <div key={index} className="chip">
                                        {skill}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileItem;

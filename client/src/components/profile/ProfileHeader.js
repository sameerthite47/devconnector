import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
    render() {

        const { profile } = this.props;

        return (
            <div className="row">
                <div className="col s12">
                    <div className="card teal">
                        <div className="card-content">
                            <div className="row">
                                <div className="col m4 offset-m4 s12 text-center">
                                    <img src={profile.user.avatar} alt="" className="responsive-img circle" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <h3 className="text-center text-white mt-0">{profile.user.name}</h3>
                                    <h5 className="text-white text-center">
                                        {profile.status}{' '}
                                        {isEmpty(profile.company) ? null : (
                                            <span>at {profile.company}</span>
                                        )}
                                    </h5>
                                    {isEmpty(profile.location) ? null : <h6 className="text-center text-white">{profile.location}</h6>}

                                    <p className="text-center text-white mt-4">
                                        {isEmpty(profile.website) ? null : (
                                            <a
                                                className="text-white p-2"
                                                href={profile.website}
                                                target="_blank"
                                            >
                                                <i className="fas fa-globe fa-2x" />
                                            </a>
                                        )}

                                        {isEmpty(profile.social && profile.social.twitter) ? null : (
                                            <a
                                                className="text-white p-2"
                                                href={profile.social.twitter}
                                                target="_blank"
                                            >
                                                <i className="fab fa-twitter fa-2x" />
                                            </a>
                                        )}

                                        {isEmpty(profile.social && profile.social.facebook) ? null : (
                                            <a
                                                className="text-white p-2"
                                                href={profile.social.facebook}
                                                target="_blank"
                                            >
                                                <i className="fab fa-facebook fa-2x" />
                                            </a>
                                        )}

                                        {isEmpty(profile.social && profile.social.linkedin) ? null : (
                                            <a
                                                className="text-white p-2"
                                                href={profile.social.linkedin}
                                                target="_blank"
                                            >
                                                <i className="fab fa-linkedin fa-2x" />
                                            </a>
                                        )}

                                        {isEmpty(profile.social && profile.social.youtube) ? null : (
                                            <a
                                                className="text-white p-2"
                                                href={profile.social.youtube}
                                                target="_blank"
                                            >
                                                <i className="fab fa-youtube fa-2x" />
                                            </a>
                                        )}

                                        {isEmpty(profile.social && profile.social.instagram) ? null : (
                                            <a
                                                className="text-white p-2"
                                                href={profile.social.instagram}
                                                target="_blank"
                                            >
                                                <i className="fab fa-instagram fa-2x" />
                                            </a>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileHeader

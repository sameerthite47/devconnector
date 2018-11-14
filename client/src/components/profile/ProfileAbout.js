import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
    render() {

        const { profile } = this.props;

        // Get first name
        const firstName = profile.user.name.trim().split(' ')[0];

        // Skill List
        const skills = profile.skills.map((skill, index) => (
            <div key={index} className="p-3">
                <i className="fa fa-check" /> {skill}
            </div>
        ));

        return (
            <div className="row">
                <div className="col s12">
                    <div className="card">
                        <div className="card-content">
                            <h4 className="text-center mt-0 mb-4">{firstName}'s Bio</h4>

                            <h6 className="text-center">
                                {isEmpty(profile.bio) ? (
                                    <span>{firstName} does not have a bio</span>
                                ) : (
                                        <span>{profile.bio}</span>
                                    )}
                            </h6>
                            <br /><hr /><br />
                            <h4 className="text-center mt-0 mb-4">{firstName}'s Skills</h4>

                            <div className="text-center mt-2">
                                {
                                    profile.skills.map((skill, index) => (
                                        <div key={index} className="chip">
                                            {skill}
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileAbout
